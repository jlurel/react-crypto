import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  Interaction,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';

ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  CrosshairPlugin,
);

Interaction.modes.interpolate = Interpolate;

const Chart = ({ history }) => {
  const prices = [];
  const timestamps = [];

  history?.history.map((item) => {
    prices.push(item.price);
    timestamps.push(
      new Date(item.timestamp).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    );
    return true;
  });

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      tooltip: {
        mode: 'interpolate',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        position: 'right',
        ticks: {
          min: Math.min.apply(this, prices),
          max: Math.max.apply(this, prices),
          callback: function (value, index, values) {
            if (index === values.length - 1) return Math.round(Math.max.apply(this, prices));
            else if (index === 0) return Math.round(Math.min.apply(this, prices));
            else return '';
          },
          color: history?.change > 0 ? 'rgba(0, 153, 51, 0.7)' : 'rgba(204, 0, 0, 0.7)',
          font: {
            size: 14,
            weight: 900,
          },
        },
      },
    },
  };

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
