import { MiddlewareConsumer,NestModule, Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import {LoggerMiddleware} from "./middleware/logger.middleware";

// 应用根模块
@Module({
  imports: [ArticleModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
