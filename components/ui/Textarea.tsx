type Props = {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({ label, value, onChange }: Props) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                rows={4}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}
