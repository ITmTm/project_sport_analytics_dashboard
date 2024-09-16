import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches } from "./matchesSlice.ts";
import { RootState, AppDispatch } from "../../store/store.ts";

const MatchesList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const matches = useSelector((state: RootState) => state.matches.matches);
    const status = useSelector((state: RootState) => state.matches.status);
    const error = useSelector((state: RootState) => state.matches.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMatches());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <p>Загрузка....</p>
    } else if (status === 'succeeded') {
        content = (
            <ul>
                {matches.map((match) => (
                    <li key={match.idEvent}>
                        {match.strEvent} - {match.dateEvent} {match.strTime}
                    </li>
                ))}
            </ul>
        );
    } else  if (status === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>Предстоящие матчи</h2>
            {content}
        </section>
    );
};

export default MatchesList;