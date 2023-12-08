import React from "react";
import ButtonAppBar from "./ButtonAppBar";
import Typography from '@mui/material/Typography';
import StockSummary from "./StockSummary";
import { StepIcon } from "@mui/material";

const homePage = {
    display: 'flex',
    padding: '20px 48px',
}

const news = {
    flex: '5',
}

const stockSummary = {
    flex: '3',
}

const Home = () => {
    return(
        <div>
            <ButtonAppBar/>
            <div style={homePage}>
                <div style={news}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, paddingBottom: '12px', }}>
                        Today's financial news
                    </Typography>
                    <div></div>
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
                        *Weekly Data
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default Home;