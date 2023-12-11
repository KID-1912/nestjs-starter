import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 创建应用实例的静态方法，返回 INestApplication 接口
  const app = await NestFactory.create(AppModule); 
  await app.listen(3000);
}
bootstrap();
