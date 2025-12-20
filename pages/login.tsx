import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/cards/Card'
import Input from '../components/ui/Input'
import Button from '../components/buttons/Button'

export default function LoginPage() {
    const { login } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        
        if (!username.trim() || !password.trim()) {
            setError('Заполните все поля')
            return
        }
        
        setIsLoading(true)
        const result = await login(username, password)
        setIsLoading(false)
        
        if (!result.success) {
            setError(result.message || 'Ошибка входа. Проверьте данные.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card>
                <h2 className="text-2xl font-semibold mb-6">Вход в админ-панель</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        label="Имя пользователя" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        type="text"
                    />
                    <Input 
                        label="Пароль" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        type="password"
                    />
                    <Button 
                        type="submit" 
                        className="bg-blue-600 text-white w-full"
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </Button>
                </form>
                
                <div className="mt-4 text-sm text-gray-600">
                    <p>По умолчанию:</p>
                    <p className="text-xs mt-1">Логин: admin</p>
                    <p className="text-xs">Пароль: admin123</p>
                </div>
            </Card>
        </div>
    )
}