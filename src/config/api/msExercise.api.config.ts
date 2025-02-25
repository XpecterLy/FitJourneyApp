import axios from "axios";
import { storageAdapter } from "../adapter/storage-adapter";

export const msExerciseHost = process.env.EXPO_PUBLIC_MS_EXERCISE;

export const msExerciseApi = axios.create({
    baseURL: msExerciseHost,
    headers: {
        'Content-Type': 'application/json'
    }
});

msExerciseApi.interceptors.request.use(
    async (config) => {
        const token = await storageAdapter.getStorage('token');
        if (token) config.headers['Authorization'] = token;
        return config; 
    }
);