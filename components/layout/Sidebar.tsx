import Link from 'next/link'
import { useRouter } from 'next/router'

const menu = [
    { href: '/', label: 'Мероприятия' },
    { href: '/events/create', label: 'Создать мероприятие' },
]

export default function Sidebar() {
    const router = useRouter()

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
            <div className="text-xl font-bold mb-8">
                Admin Panel
            </div>

            <nav className="space-y-2">
                {menu.map(item => {
                    const isActive = router.pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                block px-4 py-2 rounded
                transition
                ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}
              `}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
