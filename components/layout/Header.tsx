import { useAuth } from '../../context/AuthContext'
import PrimaryButton from '../buttons/Button'

export default function Header() {
    const { logout } = useAuth()

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <h1 className="font-semibold text-lg">Админ-панель</h1>
            <PrimaryButton onClick={logout}>Выйти</PrimaryButton>
        </header>
    )
}