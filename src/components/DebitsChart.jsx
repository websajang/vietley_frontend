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

const DebitsChart = ({ debits, debitsDates }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Debits',
            },
        },
    };

    const labels = debitsDates;

    const data = {
        labels,
        datasets: [
            {
                label: 'Debits',
                data: debits.map((data) => data),
                backgroundColor: 'rgba(13, 148, 136)',
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}

export default DebitsChart