import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
  Link,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from '../redux/Slice/UserSlice';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    role: '',
  });
  const [errors, setErrors] = useState<any>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors: any = {};
    if (!formData.fullName) tempErrors.fullName = 'Full Name is required.';
    if (!formData.email) tempErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = 'Email is invalid.';
    if (!formData.password)
      tempErrors.password = 'Password is required.';
    else if (formData.password.length < 6)
      tempErrors.password = 'Password must be at least 6 characters.';
    if (!formData.confirmPassword)
      tempErrors.confirmPassword = 'Confirm Password is required.';
    else if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.dob) tempErrors.dob = 'Date of Birth is required.';
    if (!formData.role) tempErrors.role = 'Role is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        id: nanoid(),
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      }

      try {
        dispatch(register(payload));
        // on success redirect to login page
        navigate('/login');
      } catch (err: any) {
        toast.error(err?.message)
      }
    }
  };

  return (
    <Box
      className='align-item-center'
      style={{ height: "100vh" }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 500,
          width: '100%',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" className='header' gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            required
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
            required
          />
          <TextField
            select
            label="Role"
            name="role"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
            required
          >
            {roleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className='btn-submit'
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>

        <Typography variant="body1" gutterBottom style={{ marginTop: "16px" }}>
          Already have an account? <Link className='textColor' onClick={() => navigate("/login")}>Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
