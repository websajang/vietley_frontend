import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



const Chart = () => {


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const dataSet = [
        1,
        2,
        3,
        4
    ]

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Wheel Strategy Options Profit',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataSet.map(() => ({ min: -1000, max: 1000 })),
                borderColor: 'rgb(13, 148, 136)',
                backgroundColor: 'rgba(20, 184, 166, 0.5)',
            }
        ],
    };


    return <Line options={options} data={data} />;
}

export default Chart