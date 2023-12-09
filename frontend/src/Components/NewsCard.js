import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const flexBox = {
    display: 'flex',
}

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
	const navigate = useNavigate();
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
  return (
    <Card sx={{ maxWidth: 750, marginBottom: '20px'}}>
      <CardActionArea sx={flexBox} onClick={navigateToUrl}>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="news image"
					style={imgStyle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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