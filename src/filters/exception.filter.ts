import { ExceptionFilter,  Catch, ArgumentsHost, HttpException } from "@nestjs/common"
import { Request, Response } from "express";

@Catch(HttpException)  // 捕获 HttpException 类型
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    response
      .status(status)
      .json({
        code: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url
      })
  }
}