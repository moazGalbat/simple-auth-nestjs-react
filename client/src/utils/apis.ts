import { LoginData, RegisterData } from "../types/Auth";
import { axiosInstance } from "./axiosInstance";

export const registerApi = async (data: RegisterData) => {
    return axiosInstance.post('/auth/register', data);
}

export const loginApi = async (data: LoginData) => {
    return axiosInstance.post('/auth/login', data);
}

export const profileApi = async () => {
    return axiosInstance.get('/users/me');
}