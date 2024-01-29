import React from 'react';
import { Bar } from 'react-chartjs-2';

/**
 * props: {
 *      labels,
 *      data,
 * }
 * 
 */
const BarChart = (props) => {
  // Sample data for the chart
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Portfolio Weights',
        backgroundColor: (context) => {
            // Access the value for the current bar
            const value = context.dataset.data[context.dataIndex];
  
            // Use different colors for positive and negative values
            return value >= 0 ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)';
        },
        borderColor: (context) => {
            const value = context.dataset.data[context.dataIndex];
            return value >= 0 ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)';
        },
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: props.data,
      },
    ],
  };

  // Chart configuration options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
      <Bar style={{marginTop: '40px', maxHeight: '600px', maxWidth:'1000px'}} data={data} options={options} />
  );
};

export default BarChart;
