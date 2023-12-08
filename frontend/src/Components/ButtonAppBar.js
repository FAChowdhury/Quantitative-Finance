import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom'

export default function ButtonAppBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

		const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#420194'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <b>CFinance</b>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
					<ListItem button onClick={() => {navigate('/'); setDrawerOpen(false)}}>
						<ListItemText primary="Home" />
					</ListItem>
          <ListItem button onClick={() => {setDrawerOpen(false)}}>
            <ListItemText primary="Build a Portfolio" />
          </ListItem>
          <ListItem button onClick={() => {setDrawerOpen(false)}}>
            <ListItemText primary="Arbitrage Strategies" />
          </ListItem>
          {/* Add more list items as needed */}
        </List>
      </Drawer>
    </Box>
  );
}