// /components/EventForm.tsx
import { useForm } from 'react-hook-form';

type EventFormProps = {
    onSubmit: (data: any) => void;
    defaultValues?: any;
};

export default function EventForm({ onSubmit, defaultValues }: EventFormProps) {
    const { register, handleSubmit } = useForm({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register('title')} placeholder="Название" className="w-full p-2 border rounded" />
            <textarea {...register('description')} placeholder="Описание" className="w-full p-2 border rounded" />
            <input {...register('date')} type="datetime-local" className="w-full p-2 border rounded" />
            <input {...register('location')} placeholder="Место" className="w-full p-2 border rounded" />
            <input {...register('address')} placeholder="Адрес" className="w-full p-2 border rounded" />
            <input {...register('minAge')} type="number" placeholder="Мин. возраст" className="w-full p-2 border rounded" />
            <input {...register('imageUrl')} placeholder="URL афиши" className="w-full p-2 border rounded" />
            <input {...register('organization')} placeholder="Организация" className="w-full p-2 border rounded" />
            <select {...register('status')} className="w-full p-2 border rounded">
                <option value="OPEN">Открыта</option>
                <option value="CLOSED">Закрыта</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Сохранить</button>
        </form>
    );
}
