// /components/cards/EventCard.tsx
import PrimaryButton from '../buttons/PrimaryButton';
import DangerButton from '../buttons/DangerButton';

type EventCardProps = {
    event: any;
    onEdit: () => void;
    onDelete: () => void;
};

export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-200 bg-white">
            <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-gray-500 text-sm">{event.datetime
                ? new Date(event.datetime).toLocaleDateString() + " | " +
                new Date(event.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : "Дата не указана"} | {event.ageLimit ?? "0"}</p>
            <div className="flex gap-2 mt-3">
                <PrimaryButton onClick={onEdit}>Редактировать</PrimaryButton>
                <DangerButton onClick={onDelete}>Удалить</DangerButton>
            </div>
        </div>
    );
}
