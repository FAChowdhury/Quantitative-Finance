import React from 'react';
import Button from '@mui/material/Button';

const purpleColor = {
      backgroundColor: 'purple',
      color: 'white', // You might want to adjust the text color for visibility
};

const marginStyle = {
    marginTop: '20px',
    marginLeft: '20px',
}

const PredictBtn = () => {
  const [hovered, setHovered] = React.useState(false);

  const buttonStyle = {
    backgroundColor: hovered ? 'purple' : '#420194',
    color: 'white',
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleUnhover = () => {
    setHovered(false);
  };

  return (
    <Button variant='contained'
      style={buttonStyle}
      sx={marginStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnhover}
    >
      Predict
    </Button>
  );
};

export default PredictBtn;
