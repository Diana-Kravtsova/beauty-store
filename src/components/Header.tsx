import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router';
import { AccountCircle } from '@mui/icons-material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

const navItems = [
  {
    label: 'Store',
    href: '/',
    icon: <AutoAwesomeIcon sx={{mr: 1}}/>
  },
  {
    label: 'products',
    href: 'products',
    icon: <LocalMallIcon sx={{mr: 1}}/>
  }
];

export default function Header() {
  const dispatch = useAppDispatch();
  const {user, isAuthenticated} = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
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
              {/*TODO basket*/}
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
    </Box>
  );
}
