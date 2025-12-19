import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/db'
import { runMiddleware } from '../mycors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // подключаем CORS
    await runMiddleware(req, res, (req, res, next) => next())

    if (req.method === 'GET') {
        const events = db.prepare('SELECT * FROM events ORDER BY date').all()
        return res.status(200).json(events)
    }

    if (req.method === 'POST') {
        const { title, description, date, location, address, ageLimit, minPrice, status } = req.body

        const result = db.prepare(`
      INSERT INTO events
      (title, description, date, location, address, ageLimit, minPrice, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, description, date, location, address, ageLimit, minPrice, status)

        return res.status(201).json({ id: result.lastInsertRowid })
    }

    res.status(405).end()
}
