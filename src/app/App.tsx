import * as React from "react";
import MatchesList from "../components/MatchesList.tsx";

import '../styles/app.scss'

const App: React.FC = () => {
    return (
        <div className="app">
            <h1>Sports Analytics <span>Dashboard</span> </h1>
            <MatchesList />
        </div>
    )
}

export default App
