import { z } from 'zod';

export const updateArticleSchema = z
  .object({
    id: z.number(),
    name: z.string().optional(),
    author: z.string().optional(),
    pageTotal: z.number().optional()
  })

  export type UpdateArticleDTO = z.infer<typeof updateArticleSchema>