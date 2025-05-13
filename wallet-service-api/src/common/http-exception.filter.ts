import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Error interno del servidor';
      let error = exception;
  
      // Caso: HttpException (como BadRequestException)
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const responseMessage = exception.getResponse();
      
        if (typeof responseMessage === 'string') {
          message = responseMessage;
        } else if (typeof responseMessage === 'object' && 'message' in responseMessage) {
          const res = responseMessage as { message?: string | string[] };
          message = Array.isArray(res.message)
            ? res.message.join(', ')
            : res.message || message;
        }
      }
  
      // Caso: error de MongoDB clave duplicada
      else if (exception?.code === 11000) {
        status = HttpStatus.BAD_REQUEST;
        const duplicatedField = Object.keys(exception.keyValue || {}).join(', ');
        message = `Ya existe un registro con el valor de '${duplicatedField}'`;
        error = exception.keyValue;
      }
  
      // Otro error desconocido
      else if (exception?.message) {
        message = exception.message;
      }
 
      response.status(status).json({
        success: false,
        statusCode: status,
        message,
        error,
        path: request.url,
      });
      
    }
  }
  