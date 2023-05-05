import axios from 'axios';

let hostname = window.location.hostname

const data = hostname === 'localhost' ? import.meta.env.VITE_HOST_NAME : hostname
 

export const api = axios.create({
    baseURL: `http://${ data }:${import.meta.env.VITE_API_PORT}/api`,
});
