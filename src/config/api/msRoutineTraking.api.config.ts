import axios from "axios";
import { storageAdapter } from "../adapter/storage-adapter";

export const msRoutineTrakingHost = process.env.EXPO_PUBLIC_MS_ROUTINE_TRAKING;

export const msRoutineTrakingApi = axios.create({
    baseURL: msRoutineTrakingHost,
    headers: {
        'Content-Type': 'application/json'
    }
});

msRoutineTrakingApi.interceptors.request.use(
    async (config) => {
        const token = await storageAdapter.getStorage('token');
        if (token) config.headers['Authorization'] = token;
        return config; 
    }
);