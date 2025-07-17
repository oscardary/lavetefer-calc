import { iMedicamento } from "../types/medicamento";
import { openDB } from "./database";
import { insertarMedicamento } from "./medicamento-service";

export async function resetearMedicamentos() {
  const db = await openDB();
  
  await db.execAsync('DELETE FROM medicamentos');

  const medicamentosPorDefecto: iMedicamento[] = [
    { id: '1', nombre: 'Amoxicilina', dosisPorKg: 20, unidad: 'mg', activo: 1 },
    { id: '2', nombre: 'Enrofloxacina', dosisPorKg: 5, unidad: 'mg', activo: 1 },
    { id: '3', nombre: 'Ivermectina', dosisPorKg: 0.2, unidad: 'mg', activo: 1 },
  ];

  medicamentosPorDefecto.forEach(medicamento => {
    insertarMedicamento(medicamento);
  });
  console.log('✅ Medicamentos reiniciados con valores por defecto');
};