export function formatEventDate(dateString?: string) {
    if (!dateString) return "Дата не указана";

    // заменяем пробел на T, чтобы соответствовать ISO 8601
    const normalized = dateString.replace(" ", "T");
    const date = new Date(normalized);

    if (isNaN(date.getTime())) return "Неверная дата";

    const weekday = new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(date);
    const datePart = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(date);
    const timePart = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(date);

    return `${weekday}, ${datePart} ${timePart}`;
}
