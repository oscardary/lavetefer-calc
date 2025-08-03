//MedicamentosAdaptar.ts
import { iMedicamento, iMedicamentoId } from "../../../types/medicamento";

export function adaptarParaIndexedDB(med: iMedicamento | iMedicamentoId): any {
  return { ...med, activo: med.activo ? 1 : 0 };
}

export function adaptarDesdeIndexedDB(med: any): iMedicamentoId {
  return { ...med, activo: Boolean(med.activo) };
}
