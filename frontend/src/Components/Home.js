import React from "react";
import ButtonAppBar from "./ButtonAppBar";
import Typography from '@mui/material/Typography';

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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Today's financial news
                    </Typography>
                </div>
                <div style={stockSummary}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        You may be interesed in
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default Home;