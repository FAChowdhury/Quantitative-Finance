import React, { useEffect, useState } from "react";
import ButtonAppBar from "./ButtonAppBar";
import { useParams } from "react-router-dom";
import { Typography, Box, setRef } from "@mui/material";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import StockChart from "./StockChart";
import AccordianAbout from "./AccordianAbout";
import StockPageSummary from "./StockPageSummary";
import TextBtn from "./TextBtn";
import CircularProgress from '@mui/material/CircularProgress';
import PredictChart from "./PredictChart";
import Typewriter from 'typewriter-effect'
import TwoLineChart from "./TwoLineChart";

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
	const [RMSE, setRMSE] = useState();
	const [wasDifferenced, setWasDifferenced] = useState(false);
	const [order, setOrder] = useState([]);
	const [pValue, setPValue] = useState();
	const [isStationary, setIsStationary] = useState();

	const [isIncreasing, setIsIncreasing] = useState(false);

	const [isVisibleWait, setIsVisibleWait] = useState(false);
	const [isVisiblePredictChart, setIsVisiblePredictChart] = useState(false);

  const [testData, setTestData] = useState([])
  const [testPredictions, setTestPredictions] = useState([])
  const [testDates, setTestDates] = useState([])

	const [predicting, setPredicting] = useState(false);

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
    // set Kaomoji
    // done setting Kaomoji
		setPredicting(true)
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
			setRMSE(data.RMSE)
			setWasDifferenced(data.differenced)
			setOrder(data.order)
			setPValue(data.p_value)
			setIsStationary(data.stationarity)
			setPredicting(false);
      setTestData(data.TestData)
      setTestDates(data.TestDates)
      setTestPredictions(data.TestPredictions)
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
							<div style={{display: 'flex', gap: '20px'}}>
								<div onClick={predictStocks} style={{marginTop: '20px', marginLeft: '20px'}}>
									<TextBtn text={"Predict"} />
								</div>
								{isVisibleWait && (
									<div>
										<CircularProgress sx={{marginTop: '20px',}} />
									</div>
								)}
							</div>
							{isVisiblePredictChart && (
								<div>
										{!predicting && 
											<>
												<PredictChart prices={predictedPrices} dates={predictedDates} />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                          <Typography variant="h3" sx={{marginTop: '40px'}}>Model Evaluation</Typography>
                        </div>
                        <TwoLineChart testPrices={testData} predictionPrices={testPredictions} dates={testDates} />
												<Box sx={{font: '28px', fontFamily: 'Courier New', fontWeight: '700',}}>
													<Typewriter options={{
														delay: 15, cursor: '█',
													}} onInit={(typewriter) => {
														typewriter.typeString(
															`<p>The stocks were predicted using ARIMA(${order[0]}, ${order[1]}, ${order[2]}).</p>`
														).typeString(
															`<p>Test RMSE: ${RMSE}.</p>`
														).typeString(
															`<p>
																${wasDifferenced ? `<p>The original data used to fit the model was non-stationary, therefore differencing was applied.</p>`
																: `<p>The Augmented Dickey-Fuller test obtained a p-value of ${pValue} (less than 5%), suggesting that the original data used to fit the model is stationary.</p>`}
															</p>`
														).typeString(
															`<p>
																${wasDifferenced ? `<p>
																	${isStationary ? `<p>After differencing, the Augmented Dickey-Fuller test obtained a p-value of ${pValue} (less than 5%), suggesting that the differenced data used to fit the model is stationary.</p>` 
																	: `<p>After differencing, the Augmented Dickey-Fuller test obtained a p-value of ${pValue} (greater than 5%), suggesting that the differenced data used to fit the model is not stationary.</p>`}
															</p>` :
															``
														}
														</p>`
														).typeString(`Complete.`).start();
													}}/>
												</Box>
											</>
										}
								</div>
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