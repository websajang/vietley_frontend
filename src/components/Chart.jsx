import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ credits, creditsDates }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Credits',
            },
        },
    };

    const labels = creditsDates;

    const data = {
        labels,
        datasets: [
            {
                label: 'Credits',
                data: credits.map((data) => data),
                backgroundColor: 'rgba(13, 148, 136)',
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}

export default Chart