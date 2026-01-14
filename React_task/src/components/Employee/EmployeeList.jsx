import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';
import {
  EditRounded,
  DeleteRounded,
  PrintRounded,
  SearchRounded,
  RestartAltRounded,
  PersonRounded,
} from '@mui/icons-material';
import { useEmployee } from '../../context/EmployeeContext';
import { formatDate, calculateAge } from '../../utils/validation';

function EmployeeList({ onEdit, onRefresh }) {
  const { employees, deleteEmployee, searchAndFilter } = useEmployee();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [printing, setPrinting] = useState(false);

  // Get filtered employees
  const filteredEmployees = searchAndFilter(searchTerm, {
    gender: filterGender,
    status: filterStatus,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee.id);
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
      onRefresh();
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterGender('');
    setFilterStatus(null);
    setPage(0);
  };

  const handlePrint = () => {
    setPrinting(true);
    const printWindow = window.open('', '', 'height=600,width=800');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee List Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #667eea; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #667eea; color: white; padding: 12px; text-align: left; border: 1px solid #ddd; }
            td { padding: 10px; border: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f5f5f5; }
            .active { color: green; font-weight: bold; }
            .inactive { color: red; font-weight: bold; }
            .timestamp { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Employee Management System - Employee List Report</h1>
          <p><strong>Generated on:</strong> ${new Date().toLocaleString('en-IN')}</p>
          <p><strong>Total Employees:</strong> ${filteredEmployees.length}</p>
          
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
        .map(
          (emp) => `
                <tr>
                  <td>${emp.id}</td>
                  <td>${emp.fullName}</td>
                  <td>${emp.gender}</td>
                  <td>${calculateAge(emp.dob)}</td>
                  <td>${emp.state}</td>
                  <td class="${emp.isActive ? 'active' : 'inactive'}">
                    ${emp.isActive ? '✓ Active' : '✗ Inactive'}
                  </td>
                </tr>
              `
        )
        .join('')}
            </tbody>
          </table>
          
          <div class="timestamp">
            <p>This is a system-generated report. For official use only.</p>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
    setPrinting(false);
  };

  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const activeCount = filteredEmployees.filter((emp) => emp.isActive).length;
  const inactiveCount = filteredEmployees.filter((emp) => !emp.isActive).length;

  return (
    <Box>
      {/* Search and Filter Section */}
      <Paper sx={{ p: 2, mb: 3, background: '#f5f7ff', border: '1px solid #e0e7ff' }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search by Name"
              placeholder="e.g., John"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: <SearchRounded sx={{ mr: 1, color: '#667eea' }} />,
              }}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small" sx={{ width: '180px' }}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={filterGender}
                onChange={(e) => {
                  setFilterGender(e.target.value);
                  setPage(0);
                }}
                label="Gender"
              >
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small" sx={{ width: '180px' }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus === null ? '' : filterStatus}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilterStatus(value === '' ? null : value === 'true');
                  setPage(0);
                }}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="true">✓ Active</MenuItem>
                <MenuItem value="false">✗ Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Reset Filters">
                <Button
                  variant="outlined"
                  onClick={handleResetFilters}
                  startIcon={<RestartAltRounded />}
                  size="small"
                  sx={{
                    color: '#667eea',
                    borderColor: '#667eea',
                    '&:hover': {
                      backgroundColor: '#f5f7ff',
                    },
                    width: '80px',
                  }}
                >
                  Reset
                </Button>
              </Tooltip>
              <Tooltip title="Print List">
                <Button
                  variant="outlined"
                  onClick={handlePrint}
                  disabled={printing || filteredEmployees.length === 0}
                  startIcon={<PrintRounded />}
                  size="small"
                  sx={{
                    color: '#667eea',
                    borderColor: '#667eea',
                    '&:hover': {
                      backgroundColor: '#f5f7ff',
                    },
                    width: '80px',
                  }}
                >
                  Print
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
        {/* Filter Info */}
        {(searchTerm || filterGender || filterStatus !== null) && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#667eea' }}>
              Active Filters:
            </Typography>
            {searchTerm && (
              <Chip
                label={`Name: "${searchTerm}"`}
                onDelete={() => setSearchTerm('')}
                size="small"
              />
            )}
            {filterGender && (
              <Chip
                label={`Gender: ${filterGender}`}
                onDelete={() => setFilterGender('')}
                size="small"
              />
            )}
            {filterStatus !== null && (
              <Chip
                label={`Status: ${filterStatus ? 'Active' : 'Inactive'}`}
                onDelete={() => setFilterStatus(null)}
                size="small"
              />
            )}
          </Box>
        )}
      </Paper>

      {/* Employee Count */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          label={`Total: ${filteredEmployees.length}`}
          color="primary"
          variant="outlined"
        />
        <Chip
          label={`Active: ${activeCount}`}
          sx={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}
        />
        <Chip
          label={`Inactive: ${inactiveCount}`}
          sx={{ backgroundColor: '#ffebee', color: '#c62828' }}
        />
      </Box>

      {/* Employee Table */}
      {filteredEmployees.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: '#f5f7ff',
            border: '2px dashed #e0e7ff',
          }}
        >
          <Typography variant="h6" color="textSecondary">
            📭 No employees found
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Try adjusting your search or filter criteria
          </Typography>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f7ff' }}>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Photo</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Gender</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>State</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedEmployees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f5f7ff' },
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500, color: '#667eea' }}>
                      {employee.id}
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={employee.image}
                        alt={employee.fullName}
                        sx={{
                          width: 40,
                          height: 40,
                          border: '2px solid #fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          bgcolor: '#e0e7ff',
                          color: '#667eea',
                        }}
                      >
                        {!employee.image && <PersonRounded />}
                      </Avatar>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{employee.fullName}</TableCell>
                    <TableCell>{employee.gender}</TableCell>
                    <TableCell>{calculateAge(employee.dob)}</TableCell>
                    <TableCell>{employee.state}</TableCell>
                    <TableCell>
                      <Chip
                        label={employee.isActive ? '✓ Active' : '✗ Inactive'}
                        color={employee.isActive ? 'success' : 'error'}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(employee)}
                          sx={{ color: '#667eea' }}
                        >
                          <EditRounded fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(employee)}
                          color="error"
                        >
                          <DeleteRounded fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredEmployees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: '#f5f7ff',
              borderTop: '1px solid #e0e7ff',
            }}
          />
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600, color: '#c62828' }}>
          🗑️ Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <Typography>
            Are you sure you want to delete <strong>{selectedEmployee?.fullName}</strong>?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EmployeeList;
