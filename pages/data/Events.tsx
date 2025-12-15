export type Event = {
    id: number
    title: string
    description: string
    date: string
    location: string
    ageLimit: string
}

export let events: Event[] = [
    { id: 1, title: 'Концерт', description: 'Классический концерт', date: '2025-12-20T19:00', location: 'Клуб «Муза»', ageLimit: '18+' },
    { id: 2, title: 'Выставка', description: 'Современное искусство', date: '2025-12-25T10:00', location: 'Галерея Арт', ageLimit: '6+' },
]

export function updateEvent(updated: Event) {
    events = events.map(e => (e.id === updated.id ? updated : e))
}
