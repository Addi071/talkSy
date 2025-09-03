import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://talksy-p5kg.onrender.com/api/',
    withCredentials: true,
})
