// import type { NextApiRequest, NextApiResponse } from 'next'
// import { db } from '../../../lib/db'
//
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     const id = Number(req.query.id)
//
//     if (req.method === 'DELETE') {
//         db.prepare('DELETE FROM events WHERE id = ?').run(id)
//         return res.status(204).end()
//     }
//
//     if (req.method === 'PUT') {
//         const {
//             title,
//             description,
//             date,
//             location,
//             address,
//             ageLimit,
//             minPrice,
//             status,
//         } = req.body
//
//         db.prepare(`
//       UPDATE events SET
//         title = ?,
//         description = ?,
//         date = ?,
//         location = ?,
//         address = ?,
//         ageLimit = ?,
//         minPrice = ?,
//         status = ?
//       WHERE id = ?
//     `).run(
//             title,
//             description,
//             date,
//             location,
//             address,
//             ageLimit,
//             minPrice,
//             status,
//             id
//         )
//
//         return res.status(200).json({ success: true })
//     }
//
//     res.status(405).end()
// }



import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') return res.status(200).end()

    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'No id provided' })
    const eventId = Number(id)

    if (req.method === 'GET') {
        const event = db.prepare('SELECT * FROM events WHERE id = ?').get(eventId)
        if (!event) return res.status(404).json({ error: 'Event not found' })
        return res.status(200).json(event)
    }

    if (req.method === 'PUT') {
        const { title, description, date, location, address, ageLimit, minPrice, status } = req.body
        const result = db.prepare(`
      UPDATE events
      SET title = ?, description = ?, date = ?, location = ?, address = ?, ageLimit = ?, minPrice = ?, status = ?
      WHERE id = ?
    `).run(title, description, date, location, address, ageLimit, minPrice, status, eventId)
        if (result.changes === 0) return res.status(404).json({ error: 'Event not found' })
        return res.status(200).json({ success: true })
    }

    if (req.method === 'DELETE') {
        const result = db.prepare('DELETE FROM events WHERE id = ?').run(eventId)
        if (result.changes === 0) return res.status(404).json({ error: 'Event not found' })
        return res.status(200).json({ success: true })
    }

    res.setHeader('Allow', 'GET,PUT,DELETE,OPTIONS')
    return res.status(405).end()
}
