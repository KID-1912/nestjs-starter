import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {transformInterceptor } from './interceptors/transform.interceptor'; 

async function bootstrap() {
  // 创建应用实例的静态方法，返回 INestApplication 接口
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new transformInterceptor());
  await app.listen(3000);
}
bootstrap();
