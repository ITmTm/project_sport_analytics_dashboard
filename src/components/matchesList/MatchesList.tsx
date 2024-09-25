import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchMatches } from "../../features/matches/matchesSlice.ts";
import { RootState, AppDispatch } from "../../store/store.ts";
import MatchStats from "../matchStats/MatchStats.tsx";

import useTheme from "../../hooks/useTheme.ts";
import useSortedMatches from "../../hooks/useSortedMatches.ts";

import './matchesList.scss';

const MatchesList: React.FC = () => {
    const dispatch= useDispatch<AppDispatch>();
    const matches = useSelector((state: RootState) => state.matches.matches);
    const status = useSelector((state: RootState) => state.matches.status);
    const error = useSelector((state: RootState) => state.matches.error);

    const { isDark, toggleTheme } = useTheme();
    const { sortedMatches, sortOrder, handleSort } = useSortedMatches(matches);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMatches());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setTimeout(() => setLoaded(true), 400);  // Задержка для анимации
        }
    }, [matches, status]);


    // Пример данных статистики
    const matchStats = {
        'Победы команды А': 10,
        'Победы команды B': 7,
        'Ничьи': 3,
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

                {/* Отображение статистики */}
                <MatchStats stats={matchStats} />
            </>
        );
    } else if (status === 'failed') {
        content = <p style={{ textAlign: "center", fontWeight: '600', fontSize: '20px', color: 'red' }}>{error}: Use a VPN</p>;
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