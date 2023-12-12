import React, { useEffect, useState } from "react";
import ButtonAppBar from "./ButtonAppBar";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { Line } from 'react-chartjs-2';

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

const StockPage = () => {
	const params = useParams();
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const [labels, setLabels] = useState([])
	const [x, setX] = useState([])

	const [isIncreasing, setIsIncreasing] = useState(false);

	useEffect(() => {
		setLoading(true)
		let path = `/data/${params.stock}`
		fetch(path)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((object) => {
			let tmpLabels = []
			let tmpData = []
			setLoading(false)
			object.map((e) => {
				tmpLabels.push(e.date)
				tmpData.push(e.price)
				return null
			})
			console.log(tmpLabels)
			console.log(tmpData)
			// make the data for the line graph
			setLabels(tmpLabels)
			setX(tmpData)

			// set isIncreasing
			tmpData[0] <= tmpData[tmpData.length - 1] ? setIsIncreasing(true): setIsIncreasing(false)
		})
		.catch((e) => {
			console.log(e)
		})
	}, [params.stock])

	useEffect(() => {
		setLoading(true)
		let path = `/isValid/${params.stock}`
		fetch(path)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			setIsValid(data)
			setLoading(false)
		})
		.catch((error) => {
			console.log(error)
		})
	}, [params.stock])

	return (
		<div>
			<ButtonAppBar />
			{loading
				? <Typography variant="h3">
					Loading...
				</Typography>
				: !isValid
				? <Typography variant="h3">
					The stock '{params.stock}' does not exist. Please input a valid stock!
				</Typography>
				: <Box>
					<Typography variant="h3">
						TODO: {params.stock}
					</Typography>
					<Line data={
						{
							labels: labels,
							datasets: [
								{
								label: `Price of ${params.stock} over time`,
								data: x, 
								fill: false,
								borderColor: isIncreasing ? 'green' : 'red',
								tension: 0.1,
								pointRadius: 0,
								},
							],
						}
					} options={options}/>
				</Box>
			}
		</div>
	);
}

export default StockPage