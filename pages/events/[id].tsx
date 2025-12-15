import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import Button from '../../components/buttons/Button'
import Card from '../../components/cards/Card'
import { events, updateEvent, Event } from '../data/Events'

export default function EditEventPage() {
    const router = useRouter()
    const { id } = router.query
    const [event, setEvent] = useState<Event | null>(null)

    useEffect(() => {
        if (!id) return
        const e = events.find(ev => ev.id === Number(id))
        if (e) setEvent(e)
    }, [id])

    if (!event) return <AdminLayout><p>Загрузка...</p></AdminLayout>

    const handleChange = (key: keyof Event, value: string) => {
        setEvent({ ...event, [key]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateEvent(event)
        alert('Мероприятие обновлено (mock)')
        router.push('/')
    }

    return (
        <AdminLayout>
            <Card>
                <h2 className="text-xl font-semibold mb-6">Редактирование мероприятия</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                    <Input
                        label="Название"
                        value={event.title}
                        onChange={e => handleChange('title', e.target.value)}
                    />

                    <Textarea
                        label="Описание"
                        value={event.description}
                        onChange={e => handleChange('description', e.target.value)}
                    />

                    <Input
                        label="Дата и время"
                        type="datetime-local"
                        value={event.date}
                        onChange={e => handleChange('date', e.target.value)}
                    />

                    <Input
                        label="Место проведения"
                        value={event.location}
                        onChange={e => handleChange('location', e.target.value)}
                    />

                    <Select
                        label="Возрастное ограничение"
                        value={event.ageLimit}
                        onChange={e => handleChange('ageLimit', e.target.value)}
                        options={[
                            { value: '0', label: '0+' },
                            { value: '6', label: '6+' },
                            { value: '12', label: '12+' },
                            { value: '16', label: '16+' },
                            { value: '18', label: '18+' },
                        ]}
                    />

                    <Button type="submit" className="bg-blue-600 text-white">
                        Сохранить
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    )
}
