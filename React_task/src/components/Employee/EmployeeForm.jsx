import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { PersonRounded, CloudUploadRounded, ClearRounded } from '@mui/icons-material';
import { INDIAN_STATES } from '../../services/mockData';
import { validateFullName, validateDOB, getMaxDate, getMinDate } from '../../utils/validation';
import { useEmployee } from '../../context/EmployeeContext';

function EmployeeForm({ open, onClose, editingEmployee = null, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    state: '',
    isActive: true,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { addEmployee, updateEmployee } = useEmployee();

  // Load editing employee data
  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
      setImagePreview(editingEmployee.image);
    } else {
      setFormData({
        fullName: '',
        gender: '',
        dob: '',
        state: '',
        isActive: true,
        image: null,
      });
      setImagePreview(null);
    }
    setErrors({});
    setImageFile(null);
  }, [editingEmployee, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!validateFullName(formData.fullName)) {
      newErrors.fullName = 'Name must be 3-50 characters';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!validateDOB(formData.dob)) {
      newErrors.dob = 'Employee must be 18-80 years old';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData({ ...formData, image: null });
  };


  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      try {
        if (editingEmployee) {
          updateEmployee(editingEmployee.id, formData);
        } else {
          addEmployee(formData);
        }
        onSuccess();
        onClose();
      } catch (error) {
        setErrors({ submit: 'Failed to save employee' });
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: 600,
        }}
      >
        {editingEmployee ? '✏️ Edit Employee' : '➕ Add New Employee'}
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}

        {/* Image Upload Section */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Avatar
            src={imagePreview}
            sx={{
              width: 80,
              height: 80,
              margin: '0 auto',
              mb: 2,
              border: '3px solid #667eea',
            }}
          >
            {!imagePreview && <PersonRounded sx={{ fontSize: 40 }} />}
          </Avatar>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              component="label"
              size="small"
              startIcon={<CloudUploadRounded />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Upload Photo
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
            </Button>

            {imagePreview && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<ClearRounded />}
                onClick={handleRemoveImage}
                color="error"
              >
                Remove
              </Button>
            )}
          </Box>

          <Typography variant="caption" color="textSecondary">
            Recommended: Square image, min 200x200px
          </Typography>
        </Box>

        {/* Full Name */}
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          margin="normal"
          error={!!errors.fullName}
          helperText={errors.fullName}
          placeholder="e.g., John Doe"
          disabled={loading}
        />

        {/* Gender */}
        <FormControl fullWidth margin="normal" error={!!errors.gender}>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            label="Gender"
            disabled={loading}
          >
            <MenuItem value="">-- Select Gender --</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          {errors.gender && (
            <Typography variant="caption" color="error">
              {errors.gender}
            </Typography>
          )}
        </FormControl>

        {/* Date of Birth */}
        <TextField
          fullWidth
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleInputChange}
          margin="normal"
          error={!!errors.dob}
          helperText={errors.dob}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            max: getMaxDate(),
            min: getMinDate(),
          }}
          disabled={loading}
        />

        {/* State */}
        <FormControl fullWidth margin="normal" error={!!errors.state}>
          <InputLabel>State</InputLabel>
          <Select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            label="State"
            disabled={loading}
          >
            <MenuItem value="">-- Select State --</MenuItem>
            {INDIAN_STATES.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
          {errors.state && (
            <Typography variant="caption" color="error">
              {errors.state}
            </Typography>
          )}
        </FormControl>

        {/* Active Status */}
        <FormControlLabel
          control={
            <Switch
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              disabled={loading}
            />
          }
          label={formData.isActive ? '✓ Active' : '✗ Inactive'}
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Employee'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeForm;
