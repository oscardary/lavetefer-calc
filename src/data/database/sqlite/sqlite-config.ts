import * as SQLite from "expo-sqlite";

let dbInstance: SQLite.SQLiteDatabase | null = null;

// Singleton para abrir la base de datos una sola vez
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("medicamentos.db");
  }
  return dbInstance;
}

// Ejecutar una consulta (insert, update, delete)
export async function runAsync(
  sql: string,
  params: any[] = []
): Promise<{ insertId: number }> {
  const db = await getDatabase();
  const result = await db.runAsync(sql, params);
  return {
    insertId: result.lastInsertRowId ?? 0
  };
}

// Obtener múltiples registros
export async function getAllAsync<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const db = await getDatabase();
  const result = await db.getAllAsync<T>(sql, params);
  return result ?? [];
}

// Obtener un solo registro
export async function getFirstAsync<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<T>(sql, params);
  return result ?? null;
}
