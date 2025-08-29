import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://talksy-1nau.onrender.com/api',
    withCredentials: true,
})
