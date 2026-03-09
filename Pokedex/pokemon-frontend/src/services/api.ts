import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // URL do seu NestJS
});

// Interceptor para anexar o Token JWT em todas as chamadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;