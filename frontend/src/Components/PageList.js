import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./Home";
import StockPage from "./StockPage";
import PortfolioPage from "./PortfolioPage";

const PageList = () => {
	return(
		<Routes>
			<Route>
				<Route path="/" element={<Home/>}/>
				<Route path="/quote/:stock" element={<StockPage/>} />
				<Route path="/portfolio" element={<PortfolioPage/>} />
			</Route>
		</Routes>
	);
}

export default PageList;