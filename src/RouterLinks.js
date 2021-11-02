import React from "react";
import { useState } from "react";
import {  styled, useTheme } from '@mui/material/styles';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Link, List, ListItem, ListItemIcon, ListItemText, IconButton} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box } from "@mui/system";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Customerlist from './CustomerList.js';

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

function RouterLinks() {

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const theme = useTheme();


  const [links] = useState([
    {text: 'Customers', icon: <AccountBoxIcon sx={{color:'white'}} />, link: '/'},
    {text: 'Schedule', icon: <ScheduleIcon sx={{color:'white'}} />, link: '#'},
    {text: 'Trainings', icon: <DirectionsRunIcon sx={{color:'white'}} />, link:'#'}
  ])

    return(
      <div>
        <Router>
      <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color:'white'}} /> : <ChevronLeftIcon sx={{color:'white'}} />}
        </IconButton>
      </DrawerHeader>
            <Switch>
    <Route exact path="/" component={<Customerlist />} />
    <Route path="/schedule" />
    <Route path="/trainings">
    </Route>
    <Route path="*" render={() => <h1>Page not found</h1>} />
  </Switch>
        <List>
        {links.map((object) => (
          <Link href={object.link}>
            <ListItem button key={object.text}>
                <ListItemIcon>
                   {object.icon} 
                </ListItemIcon>
                <ListItemText primary={object.text} />
                </ListItem>
            </Link>
        ))}
      </List>
    </Drawer>
    <Box component="main" sx={{flexGrow: 1, paddingTop:8}}>
      </Box>
      </Router>
    </div>
    )
}

export default RouterLinks;