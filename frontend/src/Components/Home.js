import React, { useEffect, useState } from "react";
import ButtonAppBar from "./ButtonAppBar";
import Typography from '@mui/material/Typography';
import StockSummary from "./StockSummary";
import NewsCard from "./NewsCard";

const news = {
	flex: '5',
}

const stockSummary = {
	flex: '3',
	maxWidth: '600px',
}

const Home = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	const [finNews, setFinNews] = useState([]);

	useEffect(() => {
		let path = `/news/all`
		fetch(`${path}`).then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		}).then((data) => {
			setFinNews(data.data)
			console.log(data.data)
		}).catch((error) => {
			console.log(error)
		})

		// Add event listener on component mount
		window.addEventListener('resize', handleResize);

		// Clean up event listener on component unmount
		return () => {
		window.removeEventListener('resize', handleResize);
		};
	}, [])

	const homePage = {
		display: 'flex',
		flexDirection: windowWidth > 1325 ? 'row' : 'column',
		padding: '20px 48px',
	}

	return(
		<div>
			<ButtonAppBar/>
			<div style={homePage}>
				<div style={news}>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, paddingBottom: '12px', }}>
						Today's financial news
					</Typography>
					<div>
						<NewsCard data={finNews[0]} />
						<NewsCard data={finNews[1]} />
						<NewsCard data={finNews[2]} />
					</div>
				</div>
				<div style={stockSummary}>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, paddingBottom: '12px', }}>
						You may be interesed in
					</Typography>
					<div>
						<StockSummary symbol='CBA.AX'/>
						<StockSummary symbol='TSLA'/>
						<StockSummary symbol='AMZN'/>
						<StockSummary symbol='GOOG'/>
						<StockSummary symbol='AAPL'/>
					</div>
					<Typography variant="h7" component="div" sx={{ flexGrow: 1, fontSize: '12px', textAlign: 'right'}}>
						*Daily Data
					</Typography>
				</div>
			</div>
		</div>
	);
}

export default Home;