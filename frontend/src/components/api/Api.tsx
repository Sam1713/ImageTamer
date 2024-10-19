
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  // baseUrl:'',
  withCredentials: true, 
});
 
const getToken = (config: any) => {
  console.log('con',config)
  const tokenType = config.headers['X-Token-Type']; 
  console.log('tokentype',tokenType)
 
  if(tokenType=='user'){
    return localStorage.getItem('access_token')
  }
  
};
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(config);
    console.log('token',token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('config',config)
    return config;
  },
  (error) => {
    console.log('Request error. Please try again.');
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error.response.data.message || 'An error occurred.');
    } else if (error.request) {
      console.log('No response from server. Please try again.');
    } else {
      console.log('Request setup error. Please try again.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
