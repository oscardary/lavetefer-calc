import { iMedicamento } from './../types/medicamento';
import { openDatabase } from './setup';

// Insertar un medicamento
export async function insertarMedicamento(item: iMedicamento) {
  const db = await openDatabase();
  await db.runAsync(
      `INSERT INTO medicamentos 
        (nombre, presentacion, concentracionValor, concentracionUnidad, 
          posologiaValor, posologiaUnidad, comentario, activo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
      [item.nombre, item.presentacion, item.concentracionValor, item.concentracionUnidad, 
        item.posologiaValor, item.posologiaUnidad, item.comentario, item.activo]
  );
  console.log('✅ Se insertó un medicamento');
};

// Obtener todos los medicamentos
export async function obtenerMedicamentos(): Promise<iMedicamento[]> {
  const db = await openDatabase();
  const items = await db.getAllAsync<iMedicamento>(
      'SELECT * FROM medicamentos ORDER BY nombre ASC'
  );
  console.log('✅ Se consultaron medicamentos');
  return items;
};

// Obtener solo los medicamentos marcados
export async function obtenerMedicamentosMarcados(): Promise<iMedicamento[]> {
  const db = await openDatabase();
  const items = await db.getAllAsync<iMedicamento>(
      'SELECT * FROM medicamentos WHERE activo = 1 ORDER BY nombre ASC'
  );
  console.log('✅ Se consultaron medicamentos marcados', items.length );
  return items;
};

// Marcar o desmarcar un medicamento
export const actualizarMarcadoMedicamento = async (id: number, marcado: boolean) => {
  const db = await openDatabase();
  try {
    await db.runAsync(
      'UPDATE medicamentos SET activo = ? WHERE id = ?;',
      [marcado ? 1 : 0, id]
    );
    console.log(`✅ Medicamento ${id} actualizado con activo = ${marcado}.`);
  } catch (error) {
    console.error('❌ Error al actualizar el campo activo:', error);
  }
};