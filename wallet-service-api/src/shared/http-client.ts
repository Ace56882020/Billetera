import axios, { AxiosError, AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:4000';

const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface HttpResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: any;
}

// Método general para hacer peticiones y manejar errores
async function handleRequest<T>(promise: Promise<any>) {
  try {
    const res = await promise;
    return {
      success: true,
      statusCode: res.status,
      message: res.data.message || 'Operación exitosa',
      data: res.data.data,
    };
  } catch (error: any) {
    const axiosError = error as AxiosError;

    // Validar si es un error de conexión
    const connectionErrorCodes = ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', 'EAI_AGAIN'];
    if (connectionErrorCodes.includes((axiosError as any).code)) {
      return {
        success: false,
        statusCode: 503,
        message: 'No hay conexión con el servicio externo',
        error: (axiosError as any).code,
      };
    }

    const statusCode = axiosError.response?.status || 500;
    const message =
      (axiosError.response?.data as { message?: string })?.message || 'Error desconocido';
    const errorData = (axiosError.response?.data as { error?: any })?.error || null;

    return {
      success: false,
      statusCode,
      message,
      error: errorData,
    };
  }
}

export { httpClient, handleRequest };
