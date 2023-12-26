import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, map } from "rxjs";

export interface Response<T> {
  data: T;
  code: number;
  message: string;
}

@Injectable()
// NestInterceptor<T, R> ，其中 T 表示 Observable<T>（支持响应流）的类型，R 是 Observable<R> 封装值的类型。
export class transformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map(data => ({
          data,
          code: 200,
          message: 'success'
        }))
      )
  }
}