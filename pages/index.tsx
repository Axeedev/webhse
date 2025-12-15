// pages/index.tsx
import AdminLayout from '../components/layout/AdminLayout'
import Card from '../components/cards/Card'
import Button from '../components/buttons/Button'
import { useState } from 'react'
import { useRouter } from 'next/router'

type Event = {
    id: number
    title: string
    date: string
    location: string
    ageLimit: string
}

export default function HomePage() {
    const router = useRouter() // ← добавляем сюда
    const [events, setEvents] = useState<Event[]>([
        { id: 1, title: 'Концерт', date: '2025-12-20 19:00', location: 'Клуб «Муза»', ageLimit: '18+' },
        { id: 2, title: 'Выставка', date: '2025-12-25 10:00', location: 'Галерея Арт', ageLimit: '6+' },
    ])

    const handleDelete = (id: number) => {
        if (confirm('Удалить мероприятие?')) {
            setEvents(events.filter(e => e.id !== id))
        }
    }

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Мероприятия</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <Card key={event.id}>
                        <h2 className="text-xl font-semibold">{event.title}</h2>
                        <p className="text-gray-600">{event.date}</p>
                        <p className="text-gray-600">{event.location}</p>
                        <p className="text-gray-600">Возраст: {event.ageLimit}</p>
                        <div className="mt-4 flex gap-2">
                            <Button
                                className="bg-yellow-500 text-white"
                                onClick={() => router.push(`/events/${event.id}`)} // ← теперь router доступен
                            >
                                Редактировать
                            </Button>
                            <Button
                                className="bg-red-600 text-white"
                                onClick={() => handleDelete(event.id)}
                            >
                                Удалить
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    )
}