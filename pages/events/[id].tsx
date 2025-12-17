import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import Button from '../../components/buttons/Button'
import Card from '../../components/cards/Card'

type Event = {
    id: number
    title: string
    description: string
    date: string
    location: string
    address: string
    ageLimit: number
    minPrice: number
    status: string
}

export default function EditEventPage() {
    const router = useRouter()
    const { id } = router.query

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [ageLimit, setAgeLimit] = useState<number>(0)
    const [minPrice, setMinPrice] = useState<number>(0)
    const [status, setStatus] = useState('open')
    const [loading, setLoading] = useState(true)

    // Загружаем данные мероприятия
    useEffect(() => {
        if (!id) return

        fetch('/api/events')
            .then(res => res.json())
            .then((data: Event[]) => {
                const e = data.find(ev => ev.id === Number(id))
                if (!e) return

                setTitle(e.title)
                setDescription(e.description)
                setDate(e.date)
                setLocation(e.location)
                setAddress(e.address)
                setAgeLimit(e.ageLimit)
                setMinPrice(e.minPrice)
                setStatus(e.status)
                setLoading(false)
            })
    }, [id])

    if (loading) return <AdminLayout><p>Загрузка...</p></AdminLayout>

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await fetch(`/api/events/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                date,
                location,
                address,
                ageLimit: Number(ageLimit),
                minPrice: Number(minPrice),
                status,
            }),
        })

        alert('Мероприятие обновлено')
        router.push('/')
    }

    return (
        <AdminLayout>
            <Card>
                <h2 className="text-xl font-semibold mb-6">Редактирование мероприятия</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                    <Input label="Название" value={title} onChange={e => setTitle(e.target.value)} />
                    <Textarea label="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                    <Input label="Дата и время" type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
                    <Input label="Место проведения" value={location} onChange={e => setLocation(e.target.value)} />
                    <Input label="Адрес" value={address} onChange={e => setAddress(e.target.value)} />
                    <Input label="Минимальная цена" type="number" value={minPrice.toString()} onChange={e => setMinPrice(Number(e.target.value))} />

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

                    <Button type="submit" className="bg-blue-600 text-white">
                        Сохранить
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    )
}
