import Database from "better-sqlite3";

export const db = new Database("database.db");
db.pragma("journal_mode = WAL");

db.prepare(
	`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`
).run();
