import { openDB } from '../database/database';


export async function openDatabase() {
    return await openDB();
}

export async function crearTablaMedicamentos() {
    const db = await openDatabase();
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS medicamentos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          dosisPorKg REAL NOT NULL,
          unidad TEXT NOT NULL,
          activo INTEGER DEFAULT 1
        );
      `)
    console.log('✅ Tabla medicamentos creada o existente');
};

