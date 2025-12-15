// /services/events.ts
let events = [
    { id: 1, title: 'Фестиваль Jazz Night', description: 'Концерт джазовой музыки', date: new Date().toISOString(), location: 'Концертный зал', address: 'ул. Пушкина, 10', minAge: 16, imageUrl: 'https://picsum.photos/200/300', organization: 'Jazz Club', status: 'OPEN' },
    { id: 2, title: 'Выставка современного искусства', description: 'Картины и скульптуры современных художников', date: new Date().toISOString(), location: 'Галерея ArtSpace', address: 'ул. Лермонтова, 5', minAge: 0, imageUrl: 'https://picsum.photos/200/301', organization: 'ArtSpace', status: 'OPEN' }
];

export const getEvents = async () => new Promise(resolve => setTimeout(() => resolve([...events]), 300));
export const createEvent = async (data: any) => { const id = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1; const newEvent = { id, ...data }; events.push(newEvent); return new Promise(resolve => setTimeout(() => resolve(newEvent), 300)); };
export const updateEvent = async (id: number, data: any) => { events = events.map(e => e.id === id ? { ...e, ...data } : e); return new Promise(resolve => setTimeout(() => resolve(events.find(e => e.id === id)), 300)); };
export const deleteEvent = async (id: number) => { events = events.filter(e => e.id !== id); return new Promise(resolve => setTimeout(() => resolve(true), 300)); };
