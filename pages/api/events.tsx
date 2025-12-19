import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/db'
import { runMiddleware } from '../mycors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // подключаем CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    await runMiddleware(req, res, (req, res, next) => next())

    if (req.method === 'GET') {
        const events = db.prepare('SELECT * FROM events ORDER BY datetime').all()
        console.log(events)
        return res.status(200).json(events)
    }

    if (req.method === 'POST') {
        const { title, description, datetime, location, address, ageLimit, minPrice, url } = req.body

        const result = db.prepare(`
      INSERT INTO events
      (title, description, datetime, location, address, ageLimit, minPrice, poster_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, description, datetime, location, address, ageLimit, minPrice, url)

        return res.status(201).json({ id: result.lastInsertRowid })
    }

    res.status(405).end()
}
