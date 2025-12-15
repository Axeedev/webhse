type Props = {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
}

export default function Input({
                                  label,
                                  value,
                                  onChange,
                                  type = 'text',
                              }: Props) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}
