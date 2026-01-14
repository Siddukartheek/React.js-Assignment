import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  LogoutRounded,
  GroupRounded,
  PersonRounded,
  AddRounded,
  MoreVertRounded,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import EmployeeForm from '../Employee/EmployeeForm';
import EmployeeList from '../Employee/EmployeeList';
import './Dashboard.css';

function Dashboard() {
  const { logout, user } = useAuth();
  const { employees } = useEmployee();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.isActive).length;
  const inactiveEmployees = totalEmployees - activeEmployees;
  const activePercentage =
    totalEmployees > 0 ? ((activeEmployees / totalEmployees) * 100).toFixed(0) : 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setOpenForm(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setEditingEmployee(null);
  };

  const handleFormSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="dashboard-container">
      {/* Header/AppBar */}
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <GroupRounded sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Employee Management System
            </Typography>
          </Box>

          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            <Avatar sx={{ background: 'rgba(255, 255, 255, 0.2)' }}>
              {user?.employeeId?.charAt(3) || 'A'}
            </Avatar>
            <Box sx={{ color: 'white', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user?.employeeId}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Administrator
              </Typography>
            </Box>
          </Box>

          {/* Menu Button */}
          <Button
            onClick={handleMenuClick}
            sx={{ color: 'white' }}
            startIcon={<MoreVertRounded />}
          >
            Menu
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleAddEmployee();
                handleMenuClose();
              }}
            >
              ➕ Add Employee
            </MenuItem>
            <MenuItem onClick={handleLogout}>🚪 Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{ py: 4 }}>
          {/* Welcome Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome back, {user?.employeeId}! 👋
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Manage your employee database efficiently
            </Typography>
          </Box>

          {/* Dashboard Summary Cards */}
          <Grid 
            container 
            spacing={{ xs: 1.5, sm: 2, md: 2.5 }} 
            sx={{ mb: 4 }}
          >
            {/* Total Employees Card */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(102, 126, 234, 0.5)',
                  },
                  '&:active': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography 
                        color="inherit" 
                        variant="body2" 
                        sx={{ 
                          opacity: 0.9,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          fontWeight: 500,
                        }}
                      >
                        Total Employees
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{ 
                          fontWeight: 700, 
                          mt: 1,
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' },
                          lineHeight: 1,
                        }}
                      >
                        {totalEmployees}
                      </Typography>
                    </Box>
                    <GroupRounded 
                      sx={{ 
                        fontSize: { xs: 40, sm: 48, md: 52 }, 
                        opacity: 0.25,
                        flexShrink: 0,
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Active Employees Card */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(132, 250, 176, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(132, 250, 176, 0.5)',
                  },
                  '&:active': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography 
                        color="inherit" 
                        variant="body2" 
                        sx={{ 
                          opacity: 0.9,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          fontWeight: 500,
                        }}
                      >
                        Active Employees
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{ 
                          fontWeight: 700, 
                          mt: 1,
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' },
                          lineHeight: 1,
                        }}
                      >
                        {activeEmployees}
                      </Typography>
                    </Box>
                    <PersonRounded 
                      sx={{ 
                        fontSize: { xs: 40, sm: 48, md: 52 }, 
                        opacity: 0.25,
                        flexShrink: 0,
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Inactive Employees Card */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(250, 112, 154, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(250, 112, 154, 0.5)',
                  },
                  '&:active': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography 
                        color="inherit" 
                        variant="body2" 
                        sx={{ 
                          opacity: 0.9,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          fontWeight: 500,
                        }}
                      >
                        Inactive Employees
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{ 
                          fontWeight: 700, 
                          mt: 1,
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' },
                          lineHeight: 1,
                        }}
                      >
                        {inactiveEmployees}
                      </Typography>
                    </Box>
                    <PersonRounded 
                      sx={{ 
                        fontSize: { xs: 40, sm: 48, md: 52 }, 
                        opacity: 0.25,
                        flexShrink: 0,
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            

            {/* Active Rate Card */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(79, 172, 254, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(79, 172, 254, 0.5)',
                  },
                  '&:active': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography 
                        color="inherit" 
                        variant="body2" 
                        sx={{ 
                          opacity: 0.9,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          fontWeight: 500,
                        }}
                      >
                        Active Rate
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{ 
                          fontWeight: 700, 
                          mt: 1,
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' },
                          lineHeight: 1,
                        }}
                      >
                        {activePercentage}%
                      </Typography>
                    </Box>
                    <GroupRounded 
                      sx={{ 
                        fontSize: { xs: 40, sm: 48, md: 52 }, 
                        opacity: 0.25,
                        flexShrink: 0,
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
          </Grid>
          

          {/* Action Button */}
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddRounded />}
              onClick={handleAddEmployee}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                py: 1.2,
                px: 3,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: 16,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Add New Employee
            </Button>
          </Box>

          {/* Employee List Section */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#333',
              }}
            >
              📋 Employee Directory
            </Typography>
            <EmployeeList
              key={refreshKey}
              onEdit={handleEditEmployee}
              onRefresh={handleFormSuccess}
            />
          </Box>
        </Box>
      </Container>

      {/* Employee Form Dialog */}
      <EmployeeForm
        open={openForm}
        onClose={handleFormClose}
        editingEmployee={editingEmployee}
        onSuccess={handleFormSuccess}
      />
    </Box>
  );
}

export default Dashboard;
