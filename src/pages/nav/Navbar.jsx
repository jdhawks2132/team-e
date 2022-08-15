import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar, Typography, IconButton } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SideNav from './SideNav';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));
const defaultUser = {displayName: '', photoURL: '', email: ''}

export default function Navbar() {
  const auth = useAuthContext();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(defaultUser)
  const [authorized, setAuthorized] = useState(false)

  useEffect(()=> {
    if (auth.user === null) {
        setOpen(false)
        setUser(defaultUser)
        setAuthorized(false)
    } else {
        setUser(auth.user)
        setAuthorized(true)
    }
  }, [auth])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
                { authorized ? 
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Hello, {user.displayName}
                        </Typography>
                    </Toolbar> 
                    :
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Project Manager App
                        </Typography>
                    </Toolbar>
                }
        </AppBar>
        <Toolbar /> {/* Cool trick that ensures Navbar doesn't hide content at top */}
        { authorized &&
          <SideNav handleDrawerClose={handleDrawerClose} open={open} user={user} />
        }
    </Box>
  );
}
