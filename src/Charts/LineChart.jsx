import React from 'react';
import {
    Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const LineChart = () => {

    const data = {
        labels: ['','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [1000, 52000, 15000, 70000, 25000, 80000, 40000, 80000],
                backgroundColor: 'rgba(181, 127, 190, 0.2)',
                borderColor: '#B57FBE',
                pointRadius: 3.5,
                pointBackgroundColor: '#B57FBE',
            },
            {
                label: 'Dataset 2',
                data: [30000, 10000, 90000, 40000, 52000, 5000, 70000, 16000],
                backgroundColor: 'rgba(228, 134, 127, 0.2)',
                borderColor: '#E4867F',
                pointRadius: 3.5,
                pointBackgroundColor: '#E4867F',
            }
        ]
    };

    const options = {
        responsive: true,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
            }
        },
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: '#f8f8f8',
                },
                ticks: {
                    color: '#000',
                },
                title: {
                    color: '#000',
                    display: true,
                }
            },
            y: {
                grid: {
                    display: true,
                    color: '#f8f8f8',
                },
                ticks: {
                    color: '#000',
                    callback: function(value) {
                        return value / 1000 + 'K';
                    }
                },
                beginAtZero: true,
                max: 100000
            },
        }
    };

    return (
        <>
            <div className="chart-container" style={{ height: '18em' }}>
                <Line data={data} options={options}></Line>
            </div>
        </>
    );
}

export default LineChart;
