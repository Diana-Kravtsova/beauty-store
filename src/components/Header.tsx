import React from 'react';
import { Link as RouterLink } from 'react-router';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { HeaderCartIcon } from './HeaderCartIcon';
import { HeaderWishlistIcon } from './HeaderWishlistIcon';

const navItems = [
  {
    label: 'Store',
    href: '/',
    icon: <AutoAwesomeIcon sx={{mr: 1}}/>
  },
  {
    label: 'Products',
    href: 'products',
    icon: <LocalMallIcon sx={{mr: 1}}/>
  }
];

export const Header = () => {
  const dispatch = useAppDispatch();
  const {user, isAuthenticated} = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      color="primary"
      component="header"
      sx={{
        position: 'relative',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
          <IconButton
            size="large"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon/>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{display: {xs: 'block', md: 'none'}}}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.href}
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to={item.href}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
          {navItems.map((item) => (
            <Button
              key={item.href}
              component={RouterLink}
              to={item.href}
              sx={{mx: 1}}
              startIcon={item.icon}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {isAuthenticated && user ? (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <HeaderWishlistIcon/>
            <HeaderCartIcon/>
            <Button
              sx={{
                mx: 1,
                display: 'flex',
                alignItems: 'center'
              }}
              startIcon={
                user.image ? (
                  <img
                    src={user.image}
                    alt={user.firstName}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      marginRight: 8
                    }}
                  />
                ) : (
                  <AccountCircle/>
                )
              }
            >
              {user.firstName} {user.lastName}
            </Button>

            <Button
              onClick={handleLogout}
              sx={{mx: 1}}
              startIcon={<LogoutIcon sx={{mr: 1}}/>}
            >
              Log out
            </Button>
          </Box>
        ) : (
          <Button
            component={RouterLink}
            to="/login"
            startIcon={<AccountCircle sx={{mr: 1}}/>}
            sx={{mx: 1}}
          >
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
