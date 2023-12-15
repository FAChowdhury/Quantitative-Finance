import React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const options = {
	scales: {
		x: {
		type: 'category', // Ensure the x-axis scale is set to 'category' for categorical data
		},
		y: {
		beginAtZero: true,
		},
	},
};


/**
 * Props = {
 * 		labels: [],
 *    data: [],
 *    isIncreasing: boolean,
 * }
 */

const StockChart = (props) => {
  const params = useParams();
  console.log(props)
  return (
    <div>
      <Typography variant="h3">
        {params.stock}
      </Typography>
      <Line data={
						{
							labels: props.labels,
							datasets: [
								{
								label: `Price of ${params.stock} over time`,
								data: props.data, 
								fill: false,
								borderColor: props.isIncreasing ? 'green' : 'red',
								tension: 0.1,
								pointRadius: 0,
								},
							],
						}
					} options={options}/>
    </div>
  );
}

export default StockChart;