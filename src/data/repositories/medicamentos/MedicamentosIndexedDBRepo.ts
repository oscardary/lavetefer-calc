import { iMedicamento, iMedicamentoId } from "../../../types/medicamento";
import { MedicamentosRepository } from "./MedicamentosRepository";
import { getDatabase, DB_STORE_MEDICAMENTOS } from "../../database/indexeddb/indexeddb-config";
import { adaptarDesdeIndexedDB, adaptarParaIndexedDB } from "./MedicamentosAdaptar";

export class MedicamentosIndexedDBRepo implements MedicamentosRepository {
  async obtenerTodos(): Promise<iMedicamentoId[]> {
    const db = await getDatabase();
    const medicamentos = await db.getAll(DB_STORE_MEDICAMENTOS);
    return medicamentos.map(adaptarDesdeIndexedDB);
  }

  async obtenerPorId(id: number): Promise<iMedicamentoId | null> {
    const db = await getDatabase();
    const medicamentos = await db.get(DB_STORE_MEDICAMENTOS, id);
    return medicamentos.map(adaptarDesdeIndexedDB);
  }

  async obtenerFavoritos(): Promise<iMedicamentoId[]> {
    const db = await getDatabase();
    const tx = db.transaction(DB_STORE_MEDICAMENTOS, "readonly");
    const store = tx.objectStore(DB_STORE_MEDICAMENTOS);
    const index = store.index("activo");
    const medicamentos = await index.getAll(1); // Solo donde activo = 1
    return medicamentos.map(adaptarDesdeIndexedDB);
  }

  async insertar(medicamento: iMedicamento): Promise<number> {
    const db = await getDatabase();
    const id = await db.add(DB_STORE_MEDICAMENTOS, adaptarParaIndexedDB(medicamento));
    return id as number;
  }

  async actualizar(medicamento: iMedicamentoId): Promise<void> {
    const db = await getDatabase();
    await db.put(DB_STORE_MEDICAMENTOS, adaptarParaIndexedDB(medicamento));
  }
  
  async actualizarActivo(id: number, activo: boolean): Promise<void> {
    const db = await getDatabase();
    const medicamento = await db.get(DB_STORE_MEDICAMENTOS, id);

    if (!medicamento) {
      throw new Error(`Medicamento con ID ${id} no encontrado`);
    }

    medicamento.activo = activo ? 1 : 0;
    
    await db.put(DB_STORE_MEDICAMENTOS, medicamento);
  }

  async eliminarPorId(id: number): Promise<void> {
    const db = await getDatabase();
    await db.delete(DB_STORE_MEDICAMENTOS, id);
  }

  async inicializarTablaMedicamentos(): Promise<void> {
    // No es necesario en IndexedDB, pero como se creó en SQLite debemo dejar el cuerpo vacío
  }
}
