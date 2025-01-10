import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7184/api',
    headers: {
        'Content-Type': 'application/json',
    },
});