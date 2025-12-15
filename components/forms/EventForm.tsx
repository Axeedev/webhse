// /components/forms/EventForm.tsx
import { useForm } from 'react-hook-form';
import PrimaryButton from '../buttons/PrimaryButton';

type EventFormProps = {
    onSubmit: (data: any) => void;
    defaultValues?: any;
};

export default function EventForm({ onSubmit, defaultValues }: EventFormProps) {
    const { register, handleSubmit } = useForm({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <input {...register('title')} placeholder="Название" className="w-full border p-2 rounded" />
            <textarea {...register('description')} placeholder="Описание" className="w-full border p-2 rounded" />
            <input {...register('date')} type="datetime-local" className="w-full border p-2 rounded" />
            <input {...register('location')} placeholder="Место" className="w-full border p-2 rounded" />
            <input {...register('address')} placeholder="Адрес" className="w-full border p-2 rounded" />
            <input {...register('minAge')} type="number" placeholder="Мин. возраст" className="w-full border p-2 rounded" />
            <input {...register('imageUrl')} placeholder="URL афиши" className="w-full border p-2 rounded" />
            <input {...register('organization')} placeholder="Организация" className="w-full border p-2 rounded" />
            <select {...register('status')} className="w-full border p-2 rounded">
                <option value="OPEN">Открыта</option>
                <option value="CLOSED">Закрыта</option>
            </select>
            <PrimaryButton type="submit">Сохранить</PrimaryButton>
        </form>
    );
}
