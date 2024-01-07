import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import { useState } from "react";

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


/**
 * Props = {
 * 		labels: [],
 *    data: [],
 *    isIncreasing: boolean,
 * }
 */

const StockChart = (props) => {
  const params = useParams();
  const [priceData, setPriceData] = useState([]);
  const [priceDate, setPriceDate] = useState([]);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [fiveYearFrame, setFiveYearFrame] = useState(true);

  useEffect(() => {
    setPriceData(props.data)
    setPriceDate(props.labels)
    setIsIncreasing(props.isIncreasing)
    setFiveYearFrame(true)
  }, [props.data, props.isIncreasing, props.labels])

  const timeFrame = (frame) => {
    let data = props.data.slice(-1 * frame)
    let date = props.labels.slice(-1 * frame)
    setPriceData(data); 
    setPriceDate(date); 


    setIsIncreasing(data[data.length - 1] - data[0] > 0)
    setFiveYearFrame(false)
  }

  return (
    <div style={{maxWidth: '800px'}}>
      <div style={{display: 'flex'}}>
        <Button onClick={() => {timeFrame(5)}} variant="text">1W</Button>
        <Button onClick={() => {timeFrame(21)}} variant="text">1M</Button>
        <Button onClick={() => {timeFrame(125)}} variant="text">6M</Button>
        <Button onClick={() => {timeFrame(252)}} variant="text">1Y</Button>
        <Button onClick={() => {setPriceData(props.data); setPriceDate(props.labels); setIsIncreasing(props.isIncreasing); setFiveYearFrame(true)}} variant="text">5Y</Button>
      </div>
      <Line data={
						{
							labels: priceDate,
							datasets: [
								{
								label: `Price of ${params.stock.toUpperCase()} over time`,
								data: priceData, 
								fill: false,
								borderColor: isIncreasing ? 'green' : 'red',
								tension: 0.1,
								pointRadius: fiveYearFrame ? 0 : 2,
								},
							],
						}
					} options={options}/>
    </div>
  );
}

export default StockChart;