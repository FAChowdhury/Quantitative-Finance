import React, {useEffect, useState} from "react";
import ButtonAppBar from "./ButtonAppBar";
// import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import TextBtn from "./TextBtn";
import { stockList } from "../helpers";
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

  useEffect(() => {
    stockList.sort((a,b) => a.symbol.localeCompare(b.symbol))
  }, [])

  const handleCreatePortfolio = () => {
    console.log(selectedStocks)
    // call backend to create efficient portfolio
    
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
      <div style={BtnStyle} onClick={handleCreatePortfolio}>
        <TextBtn text={"Create Portfolio"}/>
      </div>
    </div>
  )
}

export default PortfolioPage;