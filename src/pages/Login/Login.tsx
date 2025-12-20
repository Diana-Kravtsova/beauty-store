import React from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '../../store/api/authApi'
import { useAppDispatch } from '../../store/hooks'
import { setCredentials } from '../../store/slices/authSlice'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const credentials = {
      username: String(formData.get('username')),
      password: String(formData.get('password')),
    }

    try {
      const user = await login(credentials).unwrap()
      dispatch(setCredentials(user))
      navigate('/products');
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        my={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <LockOutlined />
          </Box>

          <Typography component="h1" variant="h5" gutterBottom>
            Log in
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              Login error. Check your username and password.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              defaultValue="emilys"
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue="emilyspass"
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Enter'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login;
