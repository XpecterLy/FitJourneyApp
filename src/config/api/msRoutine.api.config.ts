import axios from "axios";
import { storageAdapter } from "../adapter/storage-adapter";

export const msRoutineHost = process.env.EXPO_PUBLIC_MS_ROUTINE;

export const msRoutineApi = axios.create({
    baseURL: msRoutineHost,
    headers: {
        'Content-Type': 'application/json'
    }
});

msRoutineApi.interceptors.request.use(
    async (config) => {
        const token = await storageAdapter.getStorage('token');
        if (token) config.headers['Authorization'] = token;
        return config; 
    }
);