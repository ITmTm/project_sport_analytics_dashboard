import { useState, useEffect } from "react";
import { Match } from '../features/matches/matchesSlice.ts'

const useSortedMatches = (matches: Match[]) => {
    const [sortedMatches, setSortedMatches] = useState<Match[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        // Сортировка матчей по возрастанию при первой загрузке
        const sorted = [...matches].sort((a, b) => {
            return new Date(a.dateEvent).getTime() - new Date(b.dateEvent).getTime();
        })
        setSortedMatches(sorted);
    }, [matches]);

    // Функция для изменения порядка сортировки
    const handleSort = () => {
        const sorted = [...sortedMatches].sort((a, b) => {
            return sortOrder === 'asc'
                ? new Date(b.dateEvent).getTime() - new Date(a.dateEvent).getTime()
                : new Date(a.dateEvent).getTime() - new Date(b.dateEvent).getTime();
        });
        setSortedMatches(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')  // Переключение порядка
    };

    return { sortedMatches, sortOrder, handleSort }
};

export default useSortedMatches;
