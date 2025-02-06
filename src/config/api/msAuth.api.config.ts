import axios from "axios";
import { storageAdapter } from "../adapter/storage-adapter";

export const msAuthHost = process.env.EXPO_PUBLIC_MS_AUTH;

export const msAuthApi = axios.create({
    baseURL: msAuthHost,
    headers: {
        'Content-Type': 'application/json'
    }
});

msAuthApi.interceptors.request.use(
    async (config) => {
        const token = await storageAdapter.getStorage('token');
        if (token) config.headers['Authorization'] = token;
        return config; 
    }
);