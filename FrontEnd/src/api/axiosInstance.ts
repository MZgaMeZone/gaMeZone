import axios, { AxiosInstance } from 'axios';

const apiURL = process.env.REACT_APP_API_URL;
const api: AxiosInstance = axios.create({
  baseURL: apiURL,
});

api.interceptors.request.use(
  (config) => {
    const userToken: string | null = localStorage.getItem('userToken');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
