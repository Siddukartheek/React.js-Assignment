import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { LockRounded, PersonRounded, VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!employeeId.trim()) {
      setError('Employee ID is required');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      if (login({ employeeId: employeeId.trim(), password })) {
        navigate('/dashboard');
      } else {
        setError('Invalid Employee ID or Password. Try: EMP01202601 / 2026@01');
      }
      setLoading(false);
    }, 1000);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoClick = () => {
    setEmployeeId('EMP01202601');
    setPassword('2026@01');
  };

  return (
    <Box className="login-container">
      <Box className="login-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </Box>

      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              padding: { xs: 3, sm: 4 },
              width: '100%',
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
              animation: 'slideIn 0.5s ease-out',
              '@keyframes slideIn': {
                from: {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {/* Logo/Icon Section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                }}
              >
                <PersonRounded sx={{ color: 'white', fontSize: 32 }} />
              </Box>
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                textAlign: 'center',
                mb: 1,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Employee Management
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 3,
              }}
            >
              Secure Login Portal
            </Typography>

            {/* Error Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  animation: 'shake 0.3s ease-in-out',
                  '@keyframes shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
                  },
                }}
              >
                {error}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Employee ID Field */}
              <TextField
                fullWidth
                label="Employee ID"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                disabled={loading}
                margin="normal"
                variant="outlined"
                placeholder="EMP01202601"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRounded sx={{ color: '#667eea', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.25)',
                    },
                  },
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded sx={{ color: '#667eea', mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: '#667eea' }}
                        disabled={loading}
                      >
                        {showPassword ? (
                          <VisibilityOffRounded fontSize="small" />
                        ) : (
                          <VisibilityRounded fontSize="small" />
                        )}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.25)',
                    },
                  },
                }}
              />

              {/* Login Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: 16,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    opacity: 0.8,
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials Section */}
            <Paper
              sx={{
                p: 2,
                mt: 2,
                backgroundColor: '#f5f7ff',
                borderRadius: 2,
                border: '1px solid #e0e7ff',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#667eea' }}>
                📝 Demo Credentials:
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: '#5a67d8' }}>
                <strong>Employee ID:</strong> EMP01202601
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: '#5a67d8', mb: 1 }}>
                <strong>Password:</strong> 2026@01
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={handleDemoClick}
                disabled={loading}
                sx={{
                  mt: 1,
                  color: '#667eea',
                  borderColor: '#667eea',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#f5f7ff',
                    borderColor: '#667eea',
                  },
                }}
              >
                Use Demo Account
              </Button>
            </Paper>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
