import Database from 'better-sqlite3'

export const db = new Database('data/database.db')

// создаём таблицу если нет
db.prepare(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    date TEXT,
    location TEXT,
    address TEXT,
    ageLimit INTEGER,
    minPrice INTEGER,
    status TEXT
  )
`).run()
