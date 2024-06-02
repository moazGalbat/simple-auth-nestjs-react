import axios from 'axios';
import { getAccessToken, removeAccessToken } from './jwtHelpers';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
})

axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) removeAccessToken()
    return Promise.reject(error);
})