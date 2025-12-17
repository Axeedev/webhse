import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = Number(req.query.id)

    if (req.method === 'DELETE') {
        db.prepare('DELETE FROM events WHERE id = ?').run(id)
        return res.status(204).end()
    }

    if (req.method === 'PUT') {
        const {
            title,
            description,
            date,
            location,
            address,
            ageLimit,
            minPrice,
            status,
        } = req.body

        db.prepare(`
      UPDATE events SET
        title = ?,
        description = ?,
        date = ?,
        location = ?,
        address = ?,
        ageLimit = ?,
        minPrice = ?,
        status = ?
      WHERE id = ?
    `).run(
            title,
            description,
            date,
            location,
            address,
            ageLimit,
            minPrice,
            status,
            id
        )

        return res.status(200).json({ success: true })
    }

    res.status(405).end()
}
