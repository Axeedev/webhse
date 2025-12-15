type Props = {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { value: string; label: string }[]
}

export default function Select({ label, value, onChange, options }: Props) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map(o => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
