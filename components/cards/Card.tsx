type CardProps = {
    children: React.ReactNode
    className?: string
}

export default function Card({ children, className = '' }: CardProps) {
    return <div className={`p-4 bg-white rounded shadow ${className}`}>{children}</div>
}
