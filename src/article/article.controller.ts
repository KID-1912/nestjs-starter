import { 
  Controller, 
  Get,
  Post, 
  Param,
  Body,
  ForbiddenException,
  UseFilters,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { CreateArticleDTO } from "./dto/create-article.dto";
import { ZodValidationPipe } from "../pipes/zodValidation.pipe";
import { updateArticleSchema, UpdateArticleDTO } from "./dto/update-article.dto";
import { HttpExceptionFilter } from '../filters/exception.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard'
import { Roles } from "src/decorators/roles.decorator"
import {Article} from "./interfaces/article.interface"
import { ArticleService } from './article.service';

@Controller('article')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Roles(['admin'])
  @Get('all')
  async getArticles(): Promise<Array<Article>> {
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
