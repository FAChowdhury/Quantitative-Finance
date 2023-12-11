import React, { useEffect, useState } from "react";
import ButtonAppBar from "./ButtonAppBar";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const StockPage = () => {
	const params = useParams();
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false)
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
					The stock {params.stock} does not exist. Please input a correct stock!
				</Typography>
				: <Typography variant="h3">
						TODO: {params.stock}
				</Typography>
			}
		</div>
	);
}

export default StockPage