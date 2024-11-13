import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true, // Send cookies with requests
});

export default axiosInstance;
