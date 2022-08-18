import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { 
  ListItemAvatar,
  Avatar,
  Box,
  Drawer, 
  CssBaseline, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLogout } from '../../hooks/useLogout';
import NestedProjectList from './NestedProjectList';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SideNav(props) {
  const theme = useTheme();
  const { logout } = useLogout();

  function clickEvent(text) {
    switch (text) {
      case 'Logout':
        return logout();
      default:
        return null;
    }
  }

  // add in more buttons as we add features...
  const topNavButtonData = [
    { text: "Dashboard", icon: <DashboardIcon />, link: '/' },
    // { text: "Projects", icon: <AssignmentIcon />, link: '/' },
    { text: "New Project", icon: <AddCircleOutlineIcon />, link: '/newproject' },
    // { text: "Team Members", icon: <PeopleIcon />, link: '/' },
    // { text: "Calendar", icon: <CalendarMonthIcon />, link: '/' },
    // { text: "Messages", icon: <ForumIcon />, link: '/' }
  ]

  const bottomNavButtonData = [
    // { text: "Settings", icon: <SettingsIcon />, link: '/' },
    { text: "Logout", icon: <LogoutIcon />, link: '/' }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        <DrawerHeader>
          <Typography>
            E-ORG
          </Typography>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {topNavButtonData.map((nav, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton to={nav.link}>
                <ListItemIcon>
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.text} />
              </ListItemButton>
            </ListItem>
          ))}
          
        </List>
        <NestedProjectList />
        <Divider />
        <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="User Avatar" src={props.user.photoURL} sx={{ width: 30, height: 30 }}/>
              </ListItemAvatar>
              <ListItemText>
                  Logged in as:
              </ListItemText>
            </ListItem>
            <ListItem>  
              <ListItemText>
                  <strong>{props.user.email}</strong>
              </ListItemText>
            </ListItem>
            <Divider />
          {bottomNavButtonData.map((nav, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={(e)=> {
                e.preventDefault();
                clickEvent(nav.text)}}>
                <ListItemIcon>
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
