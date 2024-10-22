import { Button, TextField, InputAdornment } from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import api from '../components/api/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail, validateUsername, validatePassword } from '../utils/Validation'; // Import the validation functions
import CircularProgress from '@mui/material/CircularProgress';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading,setLoading]=useState<boolean>(false)
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { username: '', email: '', password: '' };

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be between 3 and 20 characters';
      valid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      // toast.error('Please fix the errors in the form.');
      return; 
    }
    try {
      setLoading(true)
      const response = await api.post('/api/auth/signup', formData);
      console.log('Signup response:', response);
      toast.success('Signup successful!');
      setFormData({ username: '', email: '', password: '' }); // Reset form
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred during signup.');
      } else {
        toast.error('Network error. Please try again.');
      }
      console.error('Signup error:', error);
    }
  };
  
  return (
    <div className='bg-custom-gradient flex justify-center items-center min-h-screen'>
      <div className='bg-black p-6 rounded-lg shadow-lg w-full max-w-sm'>
        <h1 className='text-white text-3xl mb-4 text-center font-bold'>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <TextField 
              id="username" 
              label="Username" 
              variant="outlined" 
              fullWidth 
              value={formData.username}
              onChange={handleChange}
              required
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{ 
                style: { color: 'white' }, 
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle style={{ color: 'white' }} />
                  </InputAdornment>
                ),
              }} 
              InputLabelProps={{ style: { color: 'white' } }} 
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', 
                  },
                  '&:hover fieldset': {
                    borderColor: 'lightblue', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'lightblue', 
                  },
                },
              }}
            />
          </div>
          <div className='mb-4'>
            <TextField 
              id="email" 
              label="Email" 
              variant="outlined" 
              fullWidth 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email} 
              helperText={errors.email} 
              InputProps={{ 
                style: { color: 'white' }, 
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: 'white' }} />
                  </InputAdornment>
                ),
              }} 
              InputLabelProps={{ style: { color: 'white' } }} 
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', 
                  },
                  '&:hover fieldset': {
                    borderColor: 'lightblue', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'lightblue', 
                  },
                },
              }}
            />
          </div>
          <div className='mb-4'>
            <TextField 
              id="password" 
              label="Password" 
              variant="outlined" 
              fullWidth 
              type="password" 
              value={formData.password}
              onChange={handleChange}
              required
              error={!!errors.password} 
              helperText={errors.password}
              InputProps={{ 
                style: { color: 'white' }, 
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: 'white' }} />
                  </InputAdornment>
                ),
              }} 
              InputLabelProps={{ style: { color: 'white' } }} 
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', 
                  },
                  '&:hover fieldset': {
                    borderColor: 'lightblue', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'lightblue', 
                  },
                },
              }}
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-transform duration-200"
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Signup'}
          </Button>
        </form>
        <div className='flex gap-2 mb-5 mt-5'>
          <h1 className='text-white'>Have an Account?</h1>
          <Link to="/signin"><span className='text-blue-500 cursor-pointer'>Signin</span></Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
