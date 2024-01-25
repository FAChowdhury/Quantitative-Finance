import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useParams } from "react-router-dom";

/**
 * Props = {
 * 	  testPrices: [],
 *    predictionPrices: [],
 *    dates: [],
 * }
 */

const TwoLineChart = (props) => {
  const params = useParams();
  // Sample data for two lines
  const data = {
    labels: props.dates,
    datasets: [
      {
        label: `Test Data of ${params.stock.toUpperCase()}`,
        borderColor: 'rgba(75,192,192,1)',
        data: props.testPrices,
        fill: false,
      },
      {
        label: `Prediction of ${params.stock.toUpperCase()} Test Data`,
        borderColor: 'purple',
        data: props.predictionPrices,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: data.labels,
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default TwoLineChart;
