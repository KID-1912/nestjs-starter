import { Injectable } from '@nestjs/common';
import { Article } from "./interfaces/article.interface"

@Injectable()
export class ArticleService {
  private readonly articles: Array<Article> = [];

  createArticle(article: Article): Article {
    this.articles.push(article)
    return article;
  }

  getArticles(): Array<Article> {
    return this.articles;
  }

}
