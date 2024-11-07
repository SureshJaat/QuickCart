import axios, {AxiosInstance} from 'axios';
import {getLocalStroage} from './asyncStorage/storage';
import {getBaseUrl} from './constants';


// Create an Axios instance with the base URL
const instance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

// Add request interceptor
instance.interceptors.request.use(
  async config => {
    // Check internet connectivity
    const token = await getLocalStroage('token');
    if (token) {
      // Add the token to the request headers for authorization
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  error => {
    // Handle request error
    Promise.reject(error);
  },
);

// Add response interceptor
instance.interceptors.response.use(
  response => {
    // Return the data from the response
    return response?.data;
  },
  error => {
    // Handle response error
    if (error?.response?.data) {
      // Handle response error code based on response
      return Promise.reject(error?.response?.data);
    } else {
      return Promise.reject(error);
    }
  },
);
export default instance;
