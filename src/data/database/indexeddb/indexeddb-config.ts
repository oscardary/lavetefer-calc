import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "medicamentos-db";
const DB_VERSION = 1;
const STORE_NAME = "medicamentos"; //Tabla

let dbInstance: IDBPDatabase | null = null;

export async function getDatabase(): Promise<IDBPDatabase> {
  if (!dbInstance) {
    dbInstance = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });

          store.createIndex("nombre", "nombre", { unique: false });
          store.createIndex("activo", "activo", { unique: false });
        }
      },
    });
  }
  return dbInstance;
}

export const DB_STORE_MEDICAMENTOS = STORE_NAME;
