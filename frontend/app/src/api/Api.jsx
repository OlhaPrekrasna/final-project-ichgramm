import axios from 'axios';

// Базовый URL берётся из переменной окружения
const base_url = process.env.REACT_APP_API_URL;

// Создаём экземпляр axios с этим URL
export const $api = axios.create({ baseURL: base_url });

// Перехватчик запросов для добавления токена
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// URL для Socket.IO или WebSocket
export const socketURL = process.env.REACT_APP_SOCKET_URL;
