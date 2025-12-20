import Database from 'better-sqlite3'

export const db = new Database('data/database.db')

// создаём таблицу если нет
db.prepare(`
  CREATE TABLE IF NOT EXISTS events (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        title TEXT,
                                        datetime TEXT,
                                        location TEXT,
                                    address TEXT,
                                    ageLimit INTEGER,
                                    minPrice INTEGER,
                                    type TEXT,
                                    description TEXT,
                                    poster_url TEXT
  )
`).run()

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run()


const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (userCount && typeof userCount === 'object' && 'count' in userCount) {
  if (Number(userCount.count) === 0) {
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  
  db.prepare(`
    INSERT INTO users (username, password_hash, email, role) 
    VALUES (?, ?, ?, ?)
  `).run('admin', hashedPassword, 'admin@admin.com', 'admin');
  }
}