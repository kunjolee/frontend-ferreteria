import axios from 'axios';

export const api = axios.create({
    baseURL: `http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/api`,
});
