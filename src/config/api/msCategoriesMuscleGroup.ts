import axios from "axios";
import { storageAdapter } from "../adapter/storage-adapter";

export const msCategoriesMuscleGroupHost = process.env.EXPO_PUBLIC_MS_CATEGORIES_MUSCLE_GROUP;

export const msCategoriesMuscleGroupApi = axios.create({
    baseURL: msCategoriesMuscleGroupHost,
    headers: {
        'Content-Type': 'application/json'
    }
});

msCategoriesMuscleGroupApi.interceptors.request.use(
    async (config) => {
        const token = await storageAdapter.getStorage('token');
        if (token) config.headers['Authorization'] = token;
        return config; 
    }
);