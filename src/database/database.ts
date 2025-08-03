// services/database.ts
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

export let db: any;

// Web: usar IndexedDB
async function setupWebDB() {
  const { openDB } = await import('idb');
  db = await openDB('calculadora-web-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('medicamentos')) {
        db.createObjectStore('medicamentos', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

// Móvil: usar SQLite
function setupSQLite() {
  db = SQLite.openDatabaseAsync('calculadora.db');
}

// Inicializar según plataforma
export async function initDB() {
  if (Platform.OS === 'web') {
    await setupWebDB();
  } else {
    setupSQLite();
  }
}
