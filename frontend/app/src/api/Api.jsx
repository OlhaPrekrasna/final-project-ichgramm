import axios from 'axios';

const base_url = import.meta.env.VITE_API_URL;

export const $api = axios.create({ baseURL: base_url });

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const socketURL = import.meta.env.VITE_SOCKET_URL;

// Для проверки
console.log('API_URL:', import.meta.env.VITE_API_URL);
console.log('SOCKET_URL:', import.meta.env.VITE_SOCKET_URL);

// import axios from 'axios';

// // Базовый URL берётся из переменной окружения
// // const base_url = process.env.REACT_APP_API_URL;
// const base_url = process.env.API_URL;

// // Создаём экземпляр axios с этим URL
// export const $api = axios.create({ baseURL: base_url });

// // Перехватчик запросов для добавления токена
// $api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization = token ? `Bearer ${token}` : '';
//   return config;
// });

// // URL для Socket.IO или WebSocket
// // export const socketURL = process.env.REACT_APP_SOCKET_URL;
// export const socketURL = process.env.SOCKET_URL;
