import { 
  Controller, 
  Get,
  Post, 
  Body,
  ForbiddenException,
  UseFilters,
  UseGuards,
  UsePipes,
  UseInterceptors
} from '@nestjs/common';
import { updateArticleSchema, UpdateArticleDTO } from "./dto/update-article.dto";
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard'
import { Roles } from "src/decorators/roles.decorator"
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CreateArticleDTO } from "./dto/create-article.dto";
import { ZodValidationPipe } from "../pipes/zodValidation.pipe";
import { HttpExceptionFilter } from '../filters/exception.filter';
import {Article} from "./interfaces/article.interface"
import { ArticleService } from './article.service';

@Controller('article')
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter())
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Roles(['admin'])
  @Get('all')
  async getArticles(): Promise<Article[]> {
    return await this.articleService.getArticles();
  }

  @Post('create')
  async createArticle(@Body() createArticleDTO: CreateArticleDTO): Promise<Article> {
    return await this.articleService.createArticle(createArticleDTO)
  }

  @Post('update')
  @UsePipes(new ZodValidationPipe(updateArticleSchema))
  updateArticle(
    @Body() updateArticleDTO: UpdateArticleDTO
  ) {
    return updateArticleDTO;
  }

  @Post('delete/:id')
  deleteArticle(@Body() updateArticleDTO: UpdateArticleDTO) {
    throw new ForbiddenException();
  }
}
