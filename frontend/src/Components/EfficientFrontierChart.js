import React from "react";
import { Line } from 'react-chartjs-2'
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';

/**
 * Props = {
 * 	  mean: [],
 *    stdev: [],
 * }
 */

const options = {
	scales: {
		x: {
      type: 'linear',
      beginAtZero: true,
      title: {
        display: true,
        text: 'Volatility'
      }
		},
		y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Expected Return'
      }
		},
	},
};

const EfficientFrontierChart = (props) => {
  return (
    <Line style={{marginTop: '40px', maxHeight: '600px', maxWidth:'1000px'}} data={
      {
        labels: props.stdev,
        datasets: [
          {
          label: `Expected return of portfolios in the Efficient Frontier`,
          data: props.mean, 
          fill: false,
          borderColor: 'green',
          tension: 0.1,
          },
        ],
      }
    } options={options}/>
  );
}

export default EfficientFrontierChart;