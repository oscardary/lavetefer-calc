import { iMedicamento } from "../types/medicamento";
import { openDB } from "./database";
import { insertarMedicamento } from "./medicamento-service";
//import { crearTablaMedicamentos } from "./setup";

export async function resetearMedicamentos() {
  const db = await openDB();
  
  //await db.execAsync('DELETE FROM medicamentos');
  //console.log('Tabla medicamentos eliminida');
  //await db.execAsync('DROP TABLE medicamentos');
  //await crearTablaMedicamentos();

  const medicamentosPorDefecto: iMedicamento[] = [
    { nombre: 'Quercetol Inyectable 12,5%', presentacion: 'ml', concentracionValor: 125, concentracionUnidad: 'mg/ml', posologiaValor: 12.5, posologiaUnidad: 'mg/kg', comentario: '', activo: Boolean(1) },
    { nombre: 'Quercetol Tabletas 100 mg', presentacion: 'tab', concentracionValor: 100, concentracionUnidad: 'mg/tab', posologiaValor: 12.5, posologiaUnidad: 'mg/kg', comentario: '', activo: Boolean(1)  },
    { nombre: 'Neguvon 15 g', presentacion: 'sobre', concentracionValor: 0.97, concentracionUnidad: 'mcg/ml', posologiaValor: 50, posologiaUnidad: 'mg/kg', comentario: '', activo: Boolean(0)  },
  ];

  medicamentosPorDefecto.forEach(medicamento => {
    insertarMedicamento(medicamento);
  });
  console.log('✅ Medicamentos reiniciados con valores por defecto');
};