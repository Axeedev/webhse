import { ReactNode } from 'react'

export default function Card({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            {children}
        </div>
    )
}
