import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

type NextFunction = (err?: Error) => void

// Разрешаем запросы только с клиента
const cors = Cors({
    origin: 'http://localhost:3001', // адрес твоего клиентского проекта
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

export function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => void
) {
    return new Promise<void>((resolve, reject) => {
        fn(req, res, (result?: Error) => {
            if (result instanceof Error) reject(result)
            else resolve()
        })
    })
}
