import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MatchStateProps {
    stats: {
        winsTeamA: number;      // Победа команды А
        winsTeamB: number;      // Победа команды B
        draws: number;          // Ничьи
    };
}

interface CharData {
    labels: string[];
    datasets: {
        label: string;
        data: number;
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }
}

const MatchStats: React.FC<MatchStateProps> = ({ stats }) => {
    const [chartData, setChartData] = useState<CharData>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
            // Преобразование данных для диаграмм
        const labels = ['Победа команды А', 'Победа команды B', 'Ничьи'];
        const data = [stats.winsTeamA, stats.winsTeamB, stats.draws];

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Статистика по матчам',
                    data,
                    backgroundColor: [
                        'rgba(255, 99, 132, .6)',       // Красный цвет для команды А
                        'rgba(54, 162, 235, .6)',       // Синий цвет для команды B
                        'rgba(255, 206, 86, .6)',       // Желтый цвет для ничьи
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',        // Границы для команды А
                        'rgba(54, 162, 235, 1)',        // Границы для команды B
                        'rgba(255, 206, 86, 1)',        // Границы для ничьих
                    ],
                    borderWidth: 1,
                },
            ],
        });

    }, [stats]);

    return (
        <div className='matches-stats'>
            <h2>Статистика по матчам</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default MatchStats;