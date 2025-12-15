import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import Button from '../../components/buttons/Button'
import Card from '../../components/cards/Card'

export default function CreateEventPage() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [ageLimit, setAgeLimit] = useState('0')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const event = {
            title,
            description,
            date,
            location,
            ageLimit,
        }

        console.log('Создано мероприятие:', event)
        alert('Мероприятие создано (mock)')
    }

    return (
        <AdminLayout>
            <Card>
                <h2 className="text-xl font-semibold mb-6">
                    Создание мероприятия
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                    <Input
                        label="Название"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Textarea
                        label="Описание"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Input
                        label="Дата и время"
                        type="datetime-local"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />

                    <Input
                        label="Место проведения"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />

                    <Select
                        label="Возрастное ограничение"
                        value={ageLimit}
                        onChange={e => setAgeLimit(e.target.value)}
                        options={[
                            { value: '0', label: '0+' },
                            { value: '6', label: '6+' },
                            { value: '12', label: '12+' },
                            { value: '16', label: '16+' },
                            { value: '18', label: '18+' },
                        ]}
                    />

                    <Button type="submit" className="bg-blue-600 text-white">
                        Создать мероприятие
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    )
}