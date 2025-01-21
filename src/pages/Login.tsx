import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { login } from '../redux/Slice/UserSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SYSTEM_USER } from '../helper/constant';
import { store } from '../redux/store';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password
    }
    try {
      dispatch(login(payload));
      toast.success("Login successfully.")  
      
      // based on role redirect to admin or user layout
      const globalStore = store.getState().user;

      if(globalStore?.user?.role === SYSTEM_USER.ADMIN) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
      
    } catch (err: any) {
      toast.error(err.message)  
    }
  };

  return (
    <Box
      className='align-item-center'
      style={{height: "100vh"}}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" className='header'>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            placeholder="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            placeholder="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className='btn-submit'
            style={{ padding: "10px 20px", marginTop: "16px" }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body1" gutterBottom style={{marginTop: "16px" }}>
          Don't have an account? <Link className='textColor' onClick={() => navigate("/register")}>Sign Up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
