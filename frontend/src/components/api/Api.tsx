import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Your API base URL
    withCredentials: true, // This allows sending cookies with requests
});

// Function to retrieve the access token from cookies
const getToken = () => {
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    return accessToken ? accessToken.split('=')[1] : null;
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken(); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios response interceptor to handle errors
axiosInstance.interceptors.response.use(
  response => response, // Proceed normally if no error
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized - Token might be expired or removed.");
      // You can trigger a logout or redirect the user to the login page here
      // window.location.href = "/signin"; // Redirect to login
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
