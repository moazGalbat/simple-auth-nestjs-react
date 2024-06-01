import { RegisterData } from "../types/Auth";
import { axiosInstance } from "./axiosInstance";

export const registerApi = async (data: RegisterData) => {
    return axiosInstance.post('/auth/register', data);
}