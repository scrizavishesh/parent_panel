import React from 'react';
import {
    Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);

const BarChart = () => {
    const data = {
        labels: ['Total Fee', 'Paid Fee', 'Balance Fee'],
        datasets: [
            {
                label: 'Fee Summary',
                data: [90000, 70000, 30000],
                backgroundColor: ['#01CCBB', '#E95B6D', '#FEBC00'],
                borderRadius: 10,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'INR',
                            minimumFractionDigits: 0,
                        }).format(context.parsed.y);
                    }
                }
            }
        },
        scales: {
            x: {
                font:{
                    size: 8,
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#000',
                },
                border: {
                    color: '#ccc',
                },
            },
            y: {
                grid: {
                    color: '#F3F9F8',
                },
                ticks: {
                    color: '#000',
                    callback: function (value) {
                        return new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'INR',
                            minimumFractionDigits: 0,
                        }).format(value);
                    }
                },
                beginAtZero: true,
                border: {
                    color: '#ccc',
                },
            },
        }
    };

    return (
        <>
            <div className="chart-container">
                <Bar data={data} options={options}></Bar>
            </div>
        </>
    );
}

export default BarChart;
