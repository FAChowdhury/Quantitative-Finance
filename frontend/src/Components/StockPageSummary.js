import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Props = {
 * 		symbol: string,
 * }
 */

const StockPageSummary = (props) => {
	const [symbol, setSymbol] = useState('-');
	const [price, setPrice] = useState('-');
	const [change, setChange] = useState('-');
	const [pctChange, setPctChange] = useState('-');

	useEffect(() => {
		let path = `/summary/${props.symbol}`
		fetch(`${path}`).then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		}).then((data) => {
			console.log(data)
			setSymbol(data.Stock)
			setPrice(data.Last_Price)
			setChange(data.Change)
			setPctChange(data.Percentage_Change)
		}).catch((error) => {
			console.log(error)
		})
	}, [props.symbol])

	return (
		<div style={{marginBottom: '12px',}}>
			<Box>
				<div>
                    <Typography variant="h3" component="div" sx={[{ flexGrow: 1 }]}>
                        {`$${price}`}
                    </Typography>
                    <Typography variant="h6" component="div" sx={[{ flexGrow: 1 }, {color : change > 0 ? 'green' : 'red'}]}>
                        {change > 0 ? `+${change} ` : `${change} `} {pctChange > 0 ? ` ↑${pctChange}%` : ` ↓${pctChange}%`}
                    </Typography>
				</div>
			</Box>
		</div>
	);
}

export default StockPageSummary;