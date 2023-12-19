import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleDTO, UpdateArticleDTO } from "./dto/create-article.dto";
import {Article} from "./interfaces/article.interface"
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('all')
  async getArticles(): Promise<Array<Article>> {
    return await this.articleService.getArticles();
  }

  @Post('create')
  async createArticle(@Body() createArticleDTO: CreateArticleDTO): Promise<Article> {
    return await this.articleService.createArticle(createArticleDTO)
  }

  @Post('update/:id')
  updateArticle(@Body() updateArticleDTO: UpdateArticleDTO) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
}
