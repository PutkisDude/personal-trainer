import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {CssBaseline, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CustomerList from './CustomerList';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background:'black',
  color: 'white'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  background: '#000000',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  background: 'black',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    background: 'black',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


function AppBarNavi() {

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [links] = useState([
    {text: 'Customers', icon: <AccountBoxIcon sx={{color:'white'}} />},
    {text: 'Schedule', icon: <ScheduleIcon sx={{color:'white'}} />},
    {text: 'Trainings', icon: <DirectionsRunIcon sx={{color:'white'}} />}
  ])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{display:'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{bgcolor:'#c05050'}}>
        <Toolbar>
          <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' })
          }}
          >          
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Total Gym 2021
          </Typography>
        </Toolbar>
        
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color:'white'}} /> : <ChevronLeftIcon sx={{color:'white'}} />}
          </IconButton>
        </DrawerHeader>

        <List>
          {links.map((object) => (
            <ListItem button key={object.text}>
              <ListItemIcon>
              {object.icon} 
              </ListItemIcon>
              <ListItemText primary={object.text} />
              </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, paddingTop:8}}>
        <div style={{height:'100%', width:'100%'}}>
         <CustomerList />
        </div>

      </Box>
    </Box>
  );
}

export default AppBarNavi;