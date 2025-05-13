// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4001/api', // Cambia a tu URL base
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // opcional: tiempo de espera
});

// Puedes añadir interceptores si deseas
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la respuesta:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
