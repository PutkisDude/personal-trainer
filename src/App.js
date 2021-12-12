import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  CssBaseline, IconButton, List, 
  ListItem, ListItemIcon, ListItemText, 
  Toolbar, Typography, Link
} from '@mui/material';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CustomerList from './components/CustomerList';
import Training from './components/Training';
import Schedule from './components/Schedule';
import './App.css';


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


function App() {

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [links] = useState([
    {text: 'Customers', icon: <AccountBoxIcon sx={{color:'white'}} />, link: '/'},
    {text: 'Schedule', icon: <ScheduleIcon sx={{color:'white'}} />, link: '/schedule'},
    {text: 'Trainings', icon: <DirectionsRunIcon sx={{color:'white'}} />, link: '/trainings'}
  ])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="fullheight">
    <Box className="fullheight" sx={{display:'flex'}}>
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
          {links.map((object, index) => (
            <Link key={index} href={object.link}>

            <ListItem button key={object.text}>
              <ListItemIcon> {object.icon} </ListItemIcon>
              <ListItemText primary={object.text} />
              </ListItem>
              </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 2}}>
      <DrawerHeader />

        <Router>
          <Switch>
          <Route exact path="/" component={CustomerList} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/trainings" component={Training} />
          <Route path="*" render={() => <h1>Page not found</h1>} /></Switch>
          </Router>
      </Box>
    </Box>
</div>
  );
}

export default App;