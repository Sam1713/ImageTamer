import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://imagetamer-1.onrender.com', // Your API base URL
  //  baseURL: 'http://localhost:3001',
  withCredentials: true, // This allows sending cookies with requests
});

// Function to retrieve the access token from cookies
// const getToken = () => {
//     const accessToken = document.cookie.split('; ').find(row => row.startsWith('access_token='));
//     return accessToken ? accessToken.split('=')[1] : null;
// };

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Handle the error (optional)
  return Promise.reject(error);
});



export default axiosInstance;
