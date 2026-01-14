import { useState } from 'react';
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
} from '@mui/material';
import { LogoutRounded, GroupRounded, PersonRounded } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// Mock employee data
const MOCK_EMPLOYEES = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', status: 'inactive' },
  { id: 6, name: 'Diana Wilson', email: 'diana@example.com', status: 'active' },
  { id: 7, name: 'Eve Martinez', email: 'eve@example.com', status: 'active' },
  { id: 8, name: 'Frank Taylor', email: 'frank@example.com', status: 'inactive' },
];

function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [employees] = useState(MOCK_EMPLOYEES);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.status === 'active').length;
  const inactiveEmployees = employees.filter((emp) => emp.status === 'inactive').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header with Logout */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            pb: 2,
            borderBottom: '2px solid #e0e0e0',
          }}
        >
          <div>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Employee Management Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Logged in as: <strong>{user?.email}</strong>
            </Typography>
          </div>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutRounded />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        {/* Summary Cards */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Dashboard Summary
        </Typography>

        <Grid container spacing={2} alignItems="stretch" sx={{ mb: 4 }}>
          {/* Total Employees Card */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <Typography color="inherit" gutterBottom variant="body2">
                      Total Employees
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {totalEmployees}
                    </Typography>
                  </div>
                  <GroupRounded sx={{ fontSize: 48, opacity: 0.7 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Employees Card */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <Typography color="inherit" gutterBottom variant="body2">
                      Active Employees
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {activeEmployees}
                    </Typography>
                  </div>
                  <PersonRounded sx={{ fontSize: 48, opacity: 0.7 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          

       
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <Typography color="inherit" gutterBottom variant="body2">
                      Inactive Employees
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {inactiveEmployees}
                    </Typography>
                  </div>
                  <PersonRounded sx={{ fontSize: 48, opacity: 0.7 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Inactive Percentage Card */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <Typography color="inherit" gutterBottom variant="body2">
                      Active Rate
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {totalEmployees > 0 ? ((activeEmployees / totalEmployees) * 100).toFixed(0) : 0}%
                    </Typography>
                  </div>
                  <PersonRounded sx={{ fontSize: 48, opacity: 0.7 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>

        {/* Employee List */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Employee List
        </Typography>

        <Paper sx={{ overflowX: 'auto' }}>
          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              '& th': {
                backgroundColor: '#f5f5f5',
                padding: '12px',
                textAlign: 'left',
                fontWeight: 'bold',
                borderBottom: '2px solid #e0e0e0',
              },
              '& td': {
                padding: '12px',
                borderBottom: '1px solid #e0e0e0',
              },
              '& tr:hover': {
                backgroundColor: '#fafafa',
              },
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: employee.status === 'active' ? '#e8f5e9' : '#ffebee',
                        color: employee.status === 'active' ? '#2e7d32' : '#c62828',
                        fontWeight: 500,
                      }}
                    >
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Dashboard;
