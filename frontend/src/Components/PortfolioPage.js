import React, {useEffect, useState} from "react";
import ButtonAppBar from "./ButtonAppBar";
// import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import TextBtn from "./TextBtn";
import { stockList } from "../helpers";
import CircularProgress from '@mui/material/CircularProgress';
// import Stack from '@mui/material/Stack';

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

  const [loadingEF, setLoadingEF] = useState(false);

  useEffect(() => {
    stockList.sort((a,b) => a.symbol.localeCompare(b.symbol))
  }, [])

  const handleCreatePortfolio = () => {
    setLoadingEF(true)
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
      setLoadingEF(false)
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
          // defaultValue={[top100Films[13]]}
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
    </div>
  )
}

export default PortfolioPage;