import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MatchStateProps {
    stats: { [key: string]: number };
}

const MatchStats: React.FC<MatchStateProps> = ({ stats }) => {
    const [chartData, setChartData] = useState({
        labels: [], datasets: []
    });

    useEffect(() => {
        if (Object.keys(stats).length > 0) {        // Проверка на наличие данных
            const labels = Object.keys(stats);
            const data = Object.values(stats);


            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Статистика по матчам',
                        data,
                        backgroundColor: [
                            'rgba(255, 99, 132, .6)',
                            'rgba(54, 162, 235, .6)',
                            'rgba(255, 206, 86, .6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });

        }

    }, [stats]);

    return (
        <div className='matches-stats'>
            <h2>Статистика по матчам</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default MatchStats;