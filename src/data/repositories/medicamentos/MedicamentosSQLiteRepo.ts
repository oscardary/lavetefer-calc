import { getDatabase, getAllAsync, getFirstAsync, runAsync } from "../../database/sqlite/sqlite-config";
import { iMedicamento, iMedicamentoId } from "../../../types/medicamento";
import { MedicamentosRepository } from "./MedicamentosRepository";

export class MedicamentosSQLiteRepo implements MedicamentosRepository {
  private db: any;

  constructor(dbInstance?: any) {
    //this.db = dbInstance || getDatabase();
  }

  async obtenerTodos(): Promise<iMedicamentoId[]> {
    const results = await getAllAsync("SELECT * FROM medicamentos");
    return results as iMedicamentoId[];
  }

  async obtenerPorId(id: number): Promise<iMedicamentoId | null> {
    const result = await getFirstAsync("SELECT * FROM medicamentos WHERE id = ?", [id]);
    return result ?? null;
  }

  async obtenerFavoritos(): Promise<iMedicamentoId[]> {
    const result = await getAllAsync("SELECT * FROM medicamentos WHERE activo = 1");
    return result ?? [];
  }

  async insertar(medicamento: iMedicamento): Promise<number> {
    const { nombre, presentacion, concentracionValor, concentracionUnidad, posologiaValor, posologiaUnidad, comentario, activo } = medicamento;
    const result = await runAsync(
      `INSERT INTO medicamentos 
       (nombre, presentacion, concentracionValor, concentracionUnidad, posologiaValor, posologiaUnidad, comentario, activo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, presentacion, concentracionValor, concentracionUnidad, posologiaValor, posologiaUnidad, comentario, activo ? 1 : 0]
    );
    return result.insertId;
  }

  async actualizar(medicamento: iMedicamentoId): Promise<void> {
    const { id, nombre, presentacion, concentracionValor, concentracionUnidad, posologiaValor, posologiaUnidad, comentario, activo } = medicamento;
    await runAsync(
      `UPDATE medicamentos SET 
       nombre = ?, presentacion = ?, concentracionValor = ?, concentracionUnidad = ?, 
       posologiaValor = ?, posologiaUnidad = ?, comentario = ?, activo = ? 
       WHERE id = ?`,
      [nombre, presentacion, concentracionValor, concentracionUnidad, posologiaValor, posologiaUnidad, comentario, activo ? 1 : 0, id]
    );
  }

  async actualizarActivo(id: number, activo: boolean): Promise<void> {
    await runAsync(
      `UPDATE medicamentos SET activo = ? 
       WHERE id = ?`,
      [activo, id]
    );
  }

  async eliminarPorId(id: number): Promise<void> {
    await runAsync("DELETE FROM medicamentos WHERE id = ?", [id]);
  }

  async inicializarTablaMedicamentos(): Promise<void> {
    const db = await getDatabase();
    await db.execAsync?.(`
      CREATE TABLE IF NOT EXISTS medicamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        presentacion TEXT NOT NULL,
        concentracionValor TEXT NOT NULL,
        concentracionUnidad TEXT NOT NULL,
        posologiaValor TEXT NOT NULL,
        posologiaUnidad TEXT NOT NULL,
        comentario TEXT,
        activo INTEGER NOT NULL
      );
    `);
  }
  
}
