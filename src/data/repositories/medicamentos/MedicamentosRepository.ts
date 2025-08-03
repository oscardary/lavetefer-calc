import { iMedicamento, iMedicamentoId } from "../../../types/medicamento";

export interface MedicamentosRepository {
  obtenerTodos(): Promise<iMedicamentoId[]>;
  obtenerPorId(id: number): Promise<iMedicamentoId | null>;
  obtenerFavoritos(soloActivos?: boolean): Promise<iMedicamentoId[]>;
  insertar(medicamento: Omit<iMedicamento, "id">): Promise<number>; // retorna el ID insertado
  actualizar(medicamento: iMedicamentoId): Promise<void>;
  actualizarActivo(id: number, activo: boolean): Promise<void>;
  eliminarPorId(id: number): Promise<void>;
  inicializarTablaMedicamentos(): Promise<void>;
}
