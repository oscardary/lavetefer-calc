import { iMedicamento } from './../types/medicamento';
import { openDatabase } from './setup';

export async function insertarMedicamento(item: iMedicamento) {
  const db = await openDatabase();
  await db.runAsync(
      `INSERT INTO medicamentos (nombre, dosisPorKg, unidad) VALUES (?, ?, ?)`, 
      [item.nombre, item.dosisPorKg, item.unidad]
  );
  console.log('✅ Se insertó un medicamento');
};

export async function obtenerMedicamentos(): Promise<iMedicamento[]> {
  const db = await openDatabase();
  const items = await db.getAllAsync<iMedicamento>(
      'SELECT * FROM medicamentos'
  );
  console.log('✅ Se consultaron medicamentos');
  return items;
};
