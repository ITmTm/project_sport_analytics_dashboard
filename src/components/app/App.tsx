import * as React from "react";
import MatchesList from "../matchesList/MatchesList.tsx";

import './app.scss'

const App: React.FC = () => {
    return (
        <div className="app">
            <h1>Sports Analytics <span>Dashboard</span> </h1>
            <MatchesList />
        </div>
    )
}

export default App
