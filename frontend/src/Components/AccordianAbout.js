import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Props = {
 *    symbol: string,
 * }
 */

export default function AccordianAbout(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const [about, setAbout] = React.useState('Loading...');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    // get information about stock from wikipedia
    let path = `/about/${props.symbol}`
		fetch(path)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Could not retrieve information about ${props.symbol}`);
			}
			return response.json();
		})
		.then((data) => {
			setAbout(data)
		})
		.catch((error) => {
			setAbout(error.message)
		})
  }, [props.sybol, props.symbol])

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>About</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {about}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}