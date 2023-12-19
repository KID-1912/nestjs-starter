export class CreateArticleDTO {
  name: string;
  author: string;
  pageTotal: number
}

export class UpdateArticleDTO {
  id: number;
  article: CreateArticleDTO
}