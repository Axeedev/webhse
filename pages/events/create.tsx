import { useRouter } from 'next/router'
import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import Button from '../../components/buttons/Button'
import Card from '../../components/cards/Card'

export default function CreateEventPage() {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [ageLimit, setAgeLimit] = useState(0)
    const [minPrice, setMinPrice] = useState(0)
    const [status, setStatus] = useState('open')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!date) {
            alert('Выберите дату и время')
            return
        }

        // Преобразуем дату в ISO 8601 для корректного хранения и форматирования
        const normalizedDate = date.includes('T') ? date : date + 'T00:00'

        await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                datetime: normalizedDate, // серверное поле для даты
                location,
                address,
                ageLimit: Number(ageLimit),
                minPrice: Number(minPrice),
                poster_url: url,           // серверное поле для изображения
                status
            }),
        })

        alert('Мероприятие создано')
        router.push('/')
    }

    return (
        <AdminLayout>
            <Card>
                <h2 className="text-xl font-semibold mb-6">Создать новое мероприятие</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                    <Input label="Название" value={title} onChange={e => setTitle(e.target.value)} />
                    <Input label="Url изображения" value={url} onChange={e => setUrl(e.target.value)} />
                    <Textarea label="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                    <Input
                        label="Дата и время"
                        type="datetime-local"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <Input label="Место проведения" value={location} onChange={e => setLocation(e.target.value)} />
                    <Input label="Адрес" value={address} onChange={e => setAddress(e.target.value)} />
                    <Input
                        label="Минимальная цена"
                        type="number"
                        value={minPrice.toString()}
                        onChange={e => setMinPrice(Number(e.target.value))}
                    />

                    <Select
                        label="Возрастное ограничение"
                        value={ageLimit.toString()}
                        onChange={e => setAgeLimit(Number(e.target.value))}
                        options={[
                            { value: '0', label: '0+' },
                            { value: '6', label: '6+' },
                            { value: '12', label: '12+' },
                            { value: '16', label: '16+' },
                            { value: '18', label: '18+' },
                        ]}
                    />

                    <Select
                        label="Статус"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        options={[
                            { value: 'open', label: 'Открыта' },
                            { value: 'closed', label: 'Закрыта' },
                        ]}
                    />

                    <Button type="submit" className="bg-green-600 text-white">
                        Создать
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    )
}
