import {ReactNode, useEffect} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import {useRouter} from "next/router";
import {useAuth} from "../../context/AuthContext";

type Props = {
    children: ReactNode
}

export default function AdminLayout({ children }: Props) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) router.push('/login')
    }, [isAuthenticated, router])

    if (!isAuthenticated) return null // или loader

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 min-h-screen bg-gray-100">
                <Header />
                <main className="p-6">{children}</main>
            </div>
        </div>
    )
}