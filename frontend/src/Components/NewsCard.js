import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';

const imgStyle = {
	width: '200px',
}

/**
 * props = {
 *  data: {
 *      image_url: string,
 *      source: string,
 *      title: string,
 *      description: string,
 *      url: string,
 *      ... (not important)
 *  }
 * }
 */

export default function NewsCard(props) {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

	const [isHovered, setIsHovered] = React.useState(false);

	const [title, setTitle] = React.useState('title')
	const [description, setDescription] = React.useState('description')
	const [img, setImg] = React.useState('')
	const [url, setUrl] = React.useState('')

	console.log(props)

	const navigateToUrl = () => {
    window.location.href = url;
  };

	React.useEffect(() => {
		console.log(props)
		if (props.data !== undefined) {
			setTitle(props.data.title)
		}
		if (props.data !== undefined) {
			setDescription(props.data.description)
		}
		if (props.data !== undefined) {
			setImg(props.data.image_url)
		}
		if (props.data !== undefined) {
			setUrl(props.data.url)
		}
	}, [props])

	React.useEffect(() => {
		// Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
	}, [])

	const flexBox = {
    display: 'flex',
		flexDirection: windowWidth > 800 ? 'row' : 'column',
	}

  return (
    <Card sx={{ maxWidth: 750, marginBottom: '20px'}}>
      <CardActionArea sx={flexBox} onClick={navigateToUrl} onMouseOver={() => {setIsHovered(true)}}
				onMouseOut={() => {setIsHovered(false)}}
			>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="news image"
					style={imgStyle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{color: isHovered ? 'blue' : 'black'}}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}