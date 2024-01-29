import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import TextBtn from './TextBtn';
import BarChart from './BarChart';
import { Box, Typography } from "@mui/material";
import Typewriter from 'typewriter-effect'
/**
 * props: {
 *      min,
 *      stocksList,
 * } 
 */
function GenerateWeights(props) {
  const [inputValue, setInputValue] = useState();
  const [expectedValue, setExpectedValue] = useState(props.min);
  const [canDoBetter, setCanDoBetter] = useState(false)
  const [visibleWeights, setVisibleWeights] = useState(false);

  const [weights, setWeights] = useState([]);
  const [stdev, setStdev] = useState();
  const [refresh, setRefresh] = useState(false);
  const handleInput = (event) => {
    // Allow only numeric input (including decimals)
    const regex = /^[0-9]*\.?[0-9]*$/;
    setInputValue(event.target.value)

    if ((regex.test(inputValue) || inputValue === '') && (event.target.value >= parseFloat(props.min))) {
      // Valid input, update state or perform other actions
      setExpectedValue(event.target.value)
    } else {
      setExpectedValue(props.min)
    }
  };

  const handleClick = () => {
    console.log(props.stocksList)
    if (inputValue < props.min) {
      setCanDoBetter(true)
    } else {
      setCanDoBetter(false)
    }
    setVisibleWeights(false)
    
    // call weights from backend
    let path = '/buildModernPortfolio';
    fetch(path,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"mean": parseFloat(expectedValue)})
    })
    .then(response => response.json())
    .then(result => {
      console.log('POST request successful:', result);
      // add data to useStates
      setWeights(result.weights)
      setStdev(result.stdev)
      setVisibleWeights(true)
    })
    .catch(error => {
      console.error('Error making POST request:', error);
    });
    console.log(parseFloat(expectedValue))
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <TextField
          style={{marginTop: '20px', width: '90%'}}
          label="Enter a Number"
          type="number" // Set type to 'text' to allow custom input validation
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            pattern: '[0-9]*\\.?[0-9]*', // Use a regex pattern for validation
            title: 'Only numeric values are allowed',
            defaultValue: `${props.min}`
          }}
          onChange={handleInput}
        />
      </div>
      <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}
        onClick={handleClick}
      >
        <TextBtn text={'Generate Weights'}/>
      </div>
      <br/>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {visibleWeights && canDoBetter && <Box sx={{font: '28px', fontFamily: 'Courier New', fontWeight: '700', marginLeft: '40px'}}>
            <Typewriter options={{
              delay: 25, cursor: '█',
            }} onInit={(typewriter) => {
              typewriter.typeString(
                `<p>You wanted a portfolio with an expected return of ${inputValue}</p>`
              ).typeString(
                `<p>However, we can obtain a portfolio with a higher expected return and less volatility.</p>`
              ).typeString(
                `<p>Introducing the minimum variance portfolio:</p>`
              ).typeString(
                `<p>Expected Return: ${expectedValue}.</p>`
              ).typeString(
                `<p>Volatility: ${stdev}</p>`
              ).typeString(
                `Please find the weights below.`
              ).start();
            }}/>  
          </Box>
        }
        {visibleWeights && !canDoBetter && <Box sx={{font: '28px', fontFamily: 'Courier New', fontWeight: '700', marginLeft: '40px'}}>
            <Typewriter options={{
              delay: 25, cursor: '█',
            }} onInit={(typewriter) => {
              typewriter.typeString(
                `<p>You wanted a portfolio with an expected return of ${inputValue}</p>`
              ).typeString(
                `<p>This portfolio has a volatility of ${stdev}</p>`
              ).typeString(
                `Please find the weights below.`
              ).start();
            }}/>  
          </Box>
        }
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {visibleWeights && 
          <BarChart data={weights} labels={props.stocksList} />
        }
      </div>
    </div>
  );
}

export default GenerateWeights;
