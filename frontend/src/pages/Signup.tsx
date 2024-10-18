import { Button, TextField, InputAdornment } from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form', { username, email, password });
    setUsername('');
    setEmail('');
    setPassword('');
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{ 
                style: { color: 'white' }, // Change text color to white
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle style={{ color: 'white' }} />
                  </InputAdornment>
                )
              }} 
              InputLabelProps={{ style: { color: 'white' } }} 
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', 
                  },
                  '&:hover fieldset': {
                    borderColor: 'lightblue', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'lightblue', // Change border color when focused
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{ 
                style: { color: 'white' }, 
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: 'white' }} />
                  </InputAdornment>
                )
              }} 
              InputLabelProps={{ style: { color: 'white' } }} // Change label color to white
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{ 
                style: { color: 'white' }, // Change text color to white
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: 'white' }} />
                  </InputAdornment>
                )
              }} 
              InputLabelProps={{ style: { color: 'white' } }} // Change label color to white
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Change border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'lightblue', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'lightblue', // Change border color when focused
                  },
                },
              }}
            />
          </div>
          <Button 
            className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-transform duration-200' 
            variant="contained" 
            type="submit"
          >
            Signup
          </Button>
        </form>
        <div className='flex gap-2 mb-5 mt-5'>
          <h1 className='text-white'>Have an Account?</h1>
          <Link to="/signin"><span className='text-blue-500 cursor-pointer'>Signin</span></Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
 