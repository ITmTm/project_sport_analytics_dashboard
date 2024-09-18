import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchMatches } from "../features/matches/matchesSlice.ts";
import { RootState, AppDispatch } from "../store/store.ts";

import '../styles/matchesList.scss';

const MatchesList: React.FC = () => {
    const dispatch= useDispatch<AppDispatch>();
    const matches = useSelector((state: RootState) => state.matches.matches);
    const status = useSelector((state: RootState) => state.matches.status);
    const error = useSelector((state: RootState) => state.matches.error);

    const [sortedMatches, setSortedMatches] = useState(matches);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [loaded, setLoaded] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMatches());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            // Сортировка матчей по возрастанию при первой загрузке
            const sorted = [...matches].sort((a, b) => {
                return new Date(a.dateEvent).getTime() - new Date(b.dateEvent).getTime();
            })
            setSortedMatches(sorted);
            setTimeout(() => setLoaded(true), 400)      // Задержка перед показом для эффекта
        }
    }, [matches, status]);

    // Добавление в LocalStorage для сохранения темы
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark ? 'dark' : 'light';
        setIsDark(!isDark);
        document.body.classList.toggle('dark-theme', !isDark);
        localStorage.setItem('theme', newTheme);
    }

    // Функция для изменения порядка сортировки
    const handleSort = () => {
        const sorted = [...sortedMatches].sort((a, b) => {
            return sortOrder === 'asc'
                ? new Date(b.dateEvent).getTime() - new Date(a.dateEvent).getTime()
                : new Date(a.dateEvent).getTime() - new Date(b.dateEvent).getTime();
        });
        setSortedMatches(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')  // Переключение порядка
    }

    let content;

    if (status === 'loading') {
        content = <div className='spinner'></div>
    } else if (status === 'succeeded') {
        content = (
            <>
                <button onClick={handleSort}>
                    Сортировать по дате ({sortOrder === 'asc' ? 'по убыванию' : 'по возрастанию'})
                </button>

                <ul className='matches-list'>
                    {sortedMatches.map((match) => (
                        <li key={match.idEvent} className={`matches-card ${loaded ? 'loaded' : ''}`}>
                            <time>{match.dateEvent} {match.strTime}</time>
                            <span>{match.strEvent}</span>
                        </li>
                    ))}
                </ul>
            </>
        );
    } else if (status === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <div className='matches'>
            <div className={`theme-toggle ${isDark ? 'dark' : 'light'}`} onClick={toggleTheme}>
                <div className='toggle-icon'>
                    {isDark ? (
                        <img src="https://cdn.icon-icons.com/icons2/1469/PNG/512/icon11_101144.png" alt='Dark Theme'/>
                    ) : (
                        <img
                            src="https://cdn.icon-icons.com/icons2/1152/PNG/512/1486506258-moon-night-astronomy-nature-moon-phase-sleep_81483.png" alt='Light Theme'/>
                    )}
                </div>
            </div>
            <h2>Предстоящие матчи</h2>
            {content}
        </div>
    );
};

export default MatchesList;