import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Card from '../../components/cards/Card'
import Button from '../../components/buttons/Button'
import { useRouter } from 'next/router'

type Event = {
    id: number
    title: string
    url: string
    description: string
    date: string
    location: string
    address: string
    ageLimit: number
    minPrice: number
    status: string
}

export default function HomePage() {
    const router = useRouter()
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)

    // Загружаем события с API
    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data)
                setLoading(false)
            })
    }, [])

    if (loading) return <AdminLayout><p>Загрузка...</p></AdminLayout>

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Список мероприятий</h1>
                <Button className="bg-green-600 text-white" onClick={() => router.push('/events/create')}>
                    Создать новое
                </Button>
            </div>

            {events.length === 0 && <p>Мероприятия не найдены</p>}

            {events.map(event => (
                <Card key={event.id} className="mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-lg">{event.title}</h2>
                            <p>{new Date(event.date).toLocaleString()}</p>
                            <p>{event.location}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => router.push(`/events/${event.id}`)}>Редактировать</Button>
                            <Button
                                className="bg-red-600 text-white"
                                onClick={async () => {
                                    if (!confirm('Удалить мероприятие?')) return
                                    await fetch(`/api/events/${event.id}`, { method: 'DELETE' })
                                    setEvents(prev => prev.filter(e => e.id !== event.id))
                                }}
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </AdminLayout>
    )
}
