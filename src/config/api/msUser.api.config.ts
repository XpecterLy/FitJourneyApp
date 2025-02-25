import axios from "axios";
import { storageAdapter } from "../adapter/storage-adapter";

export const msUserHost = process.env.EXPO_PUBLIC_MS_USER;

export const msUserApi = axios.create({
    baseURL: msUserHost,
    headers: {
        'Content-Type': 'application/json'
    }
});

msUserApi.interceptors.request.use(
    async (config) => {
        const token = await storageAdapter.getStorage('token');
        if (token) config.headers['Authorization'] = token;
        return config; 
    }
);