import { MedicamentosRepository } from "../data/repositories/medicamentos/MedicamentosRepository";
import { MEDICAMENTOS_POR_DEFECTO } from "../constants/medicamentos-defecto";

export async function resetearMedicamentos(repo: MedicamentosRepository): Promise<void> {
  /**
   * CONTEMPLAR:
   * - Limpiar tabla
   * - Eliminar tabla
   * - ahí si Insertar medicamentos
   */
  for (const med of MEDICAMENTOS_POR_DEFECTO) {
    await repo.insertar(med);
  }
}
