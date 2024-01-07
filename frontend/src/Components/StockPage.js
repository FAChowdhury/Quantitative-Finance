import React, { useEffect, useState } from "react";
import ButtonAppBar from "./ButtonAppBar";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import StockChart from "./StockChart";
import AccordianAbout from "./AccordianAbout";
import StockPageSummary from "./StockPageSummary";
import PredictBtn from "./PredictBtn";
import CircularProgress from '@mui/material/CircularProgress';
import PredictChart from "./PredictChart";

const left = {
	flex: '5',
}

const right = {
	flex: '3',
}

const StockPage = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	const params = useParams();
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');

	const [labels, setLabels] = useState([])
	const [x, setX] = useState([])

	const [predictedPrices, setPredictedPrices] = useState([])
	const [predictedDates, setPredictedDates] = useState([])

	const [isIncreasing, setIsIncreasing] = useState(false);

	const [isVisibleWait, setIsVisibleWait] = useState(false);
	const [isVisiblePredictChart, setIsVisiblePredictChart] = useState(false);

	useEffect(() => {
		// Add event listener on component mount
		window.addEventListener('resize', handleResize);

		// Clean up event listener on component unmount
		return () => {
		window.removeEventListener('resize', handleResize);
		};
	}, [])

	useEffect(() => {
		setIsVisiblePredictChart(false)
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

	useEffect(() => {
		setLoading(true)
		let path = `/name/${params.stock}`
		fetch(path)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			setName(data)
			setLoading(false)
		})
		.catch((error) => {
			console.log(error)
		})
	}, [params.stock])

	const stockPage = {
		display: 'flex',
		flexDirection: windowWidth > 1325 ? 'row' : 'column',
		gap: '48px',
	}

	// call backend for predictions on stocks
	const predictStocks = () => {
		console.log("Predicting stocks...")
		setIsVisibleWait(true)
		let path = `/predict/${params.stock}`
		fetch(path)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			setIsVisiblePredictChart(true)
			setIsVisibleWait(false)
			console.log(data)
			setPredictedPrices(data.Predictions)
			setPredictedDates(data.Dates)
		})
		.catch((error) => {
			setIsVisibleWait(false)
			console.log(error)
		})
	}

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
				: <Box sx={{padding: '20px 48px',}}>
					<Typography variant="h3" >
        				{name} ({params.stock.toUpperCase()})
						<hr />
      				</Typography>
					<div style={stockPage}>
						<div style={left}>
							<StockPageSummary symbol={params.stock}/>
							<StockChart labels={labels} data={x} isIncreasing={isIncreasing} />
							<div onClick={predictStocks} style={{display: 'flex', gap: '20px'}}>
								<PredictBtn />
								{isVisibleWait && (
									<div>
										<CircularProgress sx={{marginTop: '20px',}} />
									</div>
								)}
							</div>
							{isVisiblePredictChart && (
								<PredictChart prices={predictedPrices} dates={predictedDates} />
							)}
						</div>
						<div style={right}>
							<AccordianAbout symbol={params.stock}/>
						</div>
					</div>
				</Box>
			}
		</div>
	);
}

export default StockPage