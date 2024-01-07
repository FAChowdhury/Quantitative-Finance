import React from "react";
import { Line } from 'react-chartjs-2'
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';

/**
 * Props = {
 * 	  prices: [],
 *    dates: [],
 * }
 */

const options = {
	scales: {
		x: {
		type: 'category', // Ensure the x-axis scale is set to 'category' for categorical data
		},
		y: {
		beginAtZero: false,
		},
	},
};

const PredictChart = (props) => {
    const params = useParams();
    return (
      <div style={{maxWidth: '800px'}}>
        <Line data={
          {
            labels: props.dates,
            datasets: [
              {
              label: `Predicted prices of ${params.stock.toUpperCase()} over the coming month`,
              data: props.prices, 
              fill: false,
              borderColor: 'purple',
              tension: 0.1,
              },
            ],
          }
        } options={options}/>
      </div>
    );
}

export default PredictChart