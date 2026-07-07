import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database/seniorcare.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      dosage TEXT NOT NULL,
      time TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `);
});

export default db;