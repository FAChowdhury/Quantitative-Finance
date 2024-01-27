import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import TextBtn from './TextBtn';
import { Typography } from '@mui/material';

/**
 * props: {
 *      min,
 * } 
 */
function GenerateWeights(props) {
  const [inputValue, setInputValue] = useState();
  const [expectedValue, setExpectedValue] = useState(props.min);
  const [canDoBetter, setCanDoBetter] = useState(false)
  const [visibleWeights, setVisibleWeights] = useState(false);
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
    if (inputValue < props.min) {
      setCanDoBetter(true)
    } else {
      setCanDoBetter(false)
    }
    setVisibleWeights(false)
    // useEffect
    setVisibleWeights(true)
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
      {canDoBetter && <Typography>
        We can do better!
      </Typography>}
      {visibleWeights && 
        <div>
          <Typography>
            Expected Return: xxx
          </Typography>
          <Typography>
            Volatility: xxx
          </Typography>
          <Typography>
            Weights: xxx
          </Typography>
        </div>
      }
    </div>
  );
}

export default GenerateWeights;
