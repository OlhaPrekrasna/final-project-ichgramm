import axios from 'axios';

const base_url = import.meta.env.VITE_API_URL;

export const $api = axios.create({
  baseURL: base_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const socketURL = import.meta.env.VITE_SOCKET_URL;

console.log('API_URL:', import.meta.env.VITE_API_URL);
console.log('SOCKET_URL:', import.meta.env.VITE_SOCKET_URL);
