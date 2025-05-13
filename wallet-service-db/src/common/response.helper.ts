export class ResponseHelper {
    static success(data: any, message = 'Operación exitosa', statusCode = 200) {
      return {
        success: true,
        statusCode,
        message,
        data,
      };
    }
  
    static error(message = 'Error en la operación', statusCode = 500, error: any = null) {
      return {
        success: false,
        statusCode,
        message,
        error,
      };
    }
  }
  