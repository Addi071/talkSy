import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://talksy-lzjj.onrender.com/api',
    withCredentials: true,
})
