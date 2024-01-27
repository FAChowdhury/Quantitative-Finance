import React, {useEffect, useState} from "react";
import ButtonAppBar from "./ButtonAppBar";
// import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import TextBtn from "./TextBtn";
import { stockList } from "../helpers";
import CircularProgress from '@mui/material/CircularProgress';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import EfficientFrontierChart from "./EfficientFrontierChart";
import Typewriter from 'typewriter-effect'
import { Box, Typography } from "@mui/material";
import GenerateWeights from "./GenerateWeights";

const searchStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: '20px',
}

const BtnStyle = {
  display: 'flex',
  justifyContent: 'center',
}

const PortfolioPage = () => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [means, setMeans] = useState([]);
  const [stdevs, setStdevs] = useState([]);
  const [MinVarPort, setMinVarPort] = useState({});

  const [loadingEF, setLoadingEF] = useState(false);
  const [displayEFChart, setDisplayEFChart] = useState(false);

  useEffect(() => {
    stockList.sort((a,b) => a.symbol.localeCompare(b.symbol))
  }, [])

  const handleCreatePortfolio = () => {
    setLoadingEF(true)
    setDisplayEFChart(false)
    console.log(selectedStocks)
    let stocks = selectedStocks.map((value) => value.symbol)
    console.log(stocks)
    // call backend to create efficient portfolio
    let path = '/buildEfficientFrontier';
    fetch(path,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"Tickers": stocks})
    })
    .then(response => response.json())
    .then(result => {
      console.log('POST request successful:', result);
      // add data to useStates
      setMeans(result.list_of_means)
      setStdevs(result.list_of_stdev)
      setMinVarPort(result.MVP)
      setLoadingEF(false)
      setDisplayEFChart(true)
    })
    .catch(error => {
      console.error('Error making POST request:', error);
      setLoadingEF(false)
    });
  }

  return(
    <div>
      <ButtonAppBar />
      <div style={searchStyle}>
        <Autocomplete sx={{width: '80%',}}
          multiple
          id="tags-outlined"
          options={stockList}
          onChange={(event, values) => {setSelectedStocks(values)}}
          getOptionLabel={(option) => option.symbol}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add symbol"
              placeholder="AAPL, TSLA, GOOG..."
            />
          )}
        />
      </div>
      <div style={BtnStyle}>
        <div onClick={handleCreatePortfolio}>
          <TextBtn text={"Create Portfolio"}/>
        </div>
        {loadingEF && (
          <CircularProgress sx={{marginLeft: '20px'}}/>
        )}
      </div>
      {displayEFChart && (
      <div>
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', flexWrap: 'wrap'}}>
          <EfficientFrontierChart mean={means} stdev={stdevs}/>
          <Typography style={{marginTop: '40px', display: 'flex', justifyContent: 'center'}}>
            Enter your desired return from this selection of stocks:
          </Typography>
          <GenerateWeights min={MinVarPort.mean}/>
        </div>
        {/** Add information about min var portfolio + weights */}
        {/* <Box sx={{font: '28px', fontFamily: 'Courier New', fontWeight: '700', marginLeft: '40px'}}>
          <Typewriter options={{
            delay: 35, cursor: '█',
          }} onInit={(typewriter) => {
            typewriter.typeString(
              `<p>MINIMUM VARIANCE PORTFOLIO</p>`
            ).typeString(
              `<p>Expected Return: ${MinVarPort.mean}.</p>`
            ).typeString(
              `<p>Volatility: ${MinVarPort.stdev}</p>`
            ).typeString(
              `Done.`
            ).start();
          }}/>
        </Box> */}
      </div>
      )}
    </div>
  )
}

export default PortfolioPage;