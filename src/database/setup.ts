import { openDB } from '../database/database';

export async function openDatabase() {
    return await openDB();
}

export async function crearTablaMedicamentos() {
    const db = await openDatabase();

    await db.execAsync('DROP TABLE medicamentos');

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS medicamentos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          presentacion TEXT NOT NULL,
          concentracionValor REAL NOT NULL,
          concentracionUnidad TEXT NOT NULL,
          posologiaValor REAL NOT NULL,
          posologiaUnidad TEXT NOT NULL,
          comentario TEXT,
          activo BOOLEANr
        );
      `)
    console.log('✅ Tabla medicamentos creada o existente');

    //const result = await db.getAllAsync('PRAGMA table_info(medicamentos)');
    //console.log(result);
};

