import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip);

const Chart = ({ history }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  const prices = [];
  const timestamps = [];

  history?.history.map((item) => {
    prices.push(item.price);
    timestamps.push(
      new Date(item.timestamp).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    );
    return true;
  });

  const data = {
    labels: timestamps,
    datasets: [
      {
        data: prices,
        backgroundColor: history?.change > 0 ? 'rgba(71, 209, 71, 0.1)' : 'rgba(204, 0, 0, 0.1)',
        borderColor: history?.change > 0 ? 'rgba(0, 153, 51, 0.7)' : 'rgba(204, 0, 0, 0.7)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Chart;
