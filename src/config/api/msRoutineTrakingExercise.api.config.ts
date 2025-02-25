import axios from "axios";
import { storageAdapter } from "../adapter/storage-adapter";

export const msRoutineTrakingExerciseHost = process.env.EXPO_PUBLIC_MS_ROUTINE_TRAKING_EXERCISE;

export const msRoutineTrakingExerciseApi = axios.create({
    baseURL: msRoutineTrakingExerciseHost,
    headers: {
        'Content-Type': 'application/json'
    }
});

msRoutineTrakingExerciseApi.interceptors.request.use(
    async (config) => {
        const token = await storageAdapter.getStorage('token');
        if (token) config.headers['Authorization'] = token;
        return config; 
    }
);