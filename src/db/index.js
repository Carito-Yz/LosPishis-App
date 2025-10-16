import * as SQLite from 'expo-sqlite';

let db

export const initDb = async () => {
    if(!db){
        db = await SQLite.openDatabaseAsync('mundogeek.db')
    }
}

export const initSessionsTable = async ()=>{
    await initDb()
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            localId TEXT,
            email TEXT
        )
        `)
}

export const saveSession = async (localId, email) => {
    await initDb();
    await db.runAsync('DELETE FROM sessions;'); // reemplaza sesión anterior. SIEMPRE USAR WHERE!!! En este caso no es necesario
    await db.runAsync('INSERT INTO sessions (localId, email) VALUES (?, ?);', [localId, email]);
}

export const getSession = async () => {
    await initDb();
    const result = await db.getAllAsync('SELECT * FROM sessions LIMIT 1;');
    return result.length > 0 ? result[0] : null;
};

export const clearSession = async () => {
    await initDb();
    await db.runAsync('DELETE FROM sessions'); ///SIEMPRE USAR WHERE!!! En este caso no es necesario
};