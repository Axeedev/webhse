import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/cards/Card'
import Input from '../components/ui/Input'
import Button from '../components/buttons/Button'

export default function LoginPage() {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card>
                <h2 className="text-2xl font-semibold mb-6">Вход в админ-панель</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    <Input label="Пароль" value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    <Button type="submit" className="bg-blue-600 text-white w-full">Войти</Button>
                </form>
            </Card>
        </div>
    )
}
