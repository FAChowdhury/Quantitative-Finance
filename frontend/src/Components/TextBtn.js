import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

const purpleColor = {
  backgroundColor: 'purple',
  color: 'white', // You might want to adjust the text color for visibility
};

// const marginStyle = {
//     marginTop: '20px',
//     marginLeft: '20px',
// }

/**
 * props: {
 *  text: string
 * }
 */

const TextBtn = (props) => {
  const [hovered, setHovered] = React.useState(false);

  const [text, setText] = React.useState("");

  useEffect(() => {
    setText(props.text)
  }, [props.text])

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
      // sx={marginStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnhover}
    >
      {text}
    </Button>
  );
};

export default TextBtn;
