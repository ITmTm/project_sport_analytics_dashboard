import { useState, useMemo } from "react";
import { Match } from '../features/matches/matchesSlice.ts'

const useSortedMatches = (matches: Match[]) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

        // Использование useMemo для мемоизации сортированных матчей
    const sortedMatches = useMemo(() => {
        // Сортировка матчей по возрастанию при первой загрузке
        const sorted = [...matches].sort((a, b) => {
            const dateA = new Date(`${a.dateEvent}T${a.strTime}`);
            const dateB = new Date(`${b.dateEvent}T${b.strTime}`);
            return dateA.getTime() - dateB.getTime();
        });
        return sortOrder === 'asc' ? sorted : sorted.reverse();     // Если порядок 'desc', то разворачиваем
    }, [matches, sortOrder]);

    // Функция для изменения порядка сортировки
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')  // Переключение порядка
    };

    return { sortedMatches, sortOrder, handleSort }
};

export default useSortedMatches;
