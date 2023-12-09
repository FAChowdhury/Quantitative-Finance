import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const basicStyle = {
	display: 'flex',
	borderTop: 'solid 1px black',
	padding: '10px 0px',
}

const symbolBox = {
	flex: '1',
}

const dataBox = {
	flex: '1.5',
	display: 'flex',
	justifyContent: 'space-around',
	textAlign: 'right',
}

/**
 * Props = {
 * 		symbol: string,
 * }
 */

const StockSummary = (props) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
	setWindowWidth(window.innerWidth);
  };

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

	React.useEffect(() => {
		// Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
	}, [])

	const textStyle = {
		fontSize: windowWidth > 600 ? '24px' : '12px',
	}

	return (
		<div style={basicStyle}>
			<div style={symbolBox}>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<b>{symbol}</b>
				</Typography>
			</div>
			<div style={dataBox}>
				<div>
					<Typography variant="h6" component="div" sx={[{ flexGrow: 1 }, textStyle]}>
						{`$${price}`}
					</Typography>
				</div>
				<div>
					<Typography variant="h6" component="div" sx={[{ flexGrow: 1 }, {color : change > 0 ? 'green' : 'red'}, textStyle]}>
						{change > 0 ? `+${change}` : `${change}`}
					</Typography>
				</div>
				<div>
					<Typography variant="h6" component="div" sx={[{ flexGrow: 1 }, {color : pctChange > 0 ? 'green' : 'red'}, textStyle]}>
						{pctChange > 0 ? `↑${pctChange}%` : `↓${pctChange}%`}
					</Typography>
				</div>
			</div>
		</div>
	);
}

export default StockSummary;