import * as SQLite from 'expo-sqlite';

export const openDB = () => SQLite.openDatabaseAsync('calculadora.db');