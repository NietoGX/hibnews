export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: Tag[];
  imageUrl?: string;
}
export enum Tag {
  TECHNOLOGY = "Technology",
  HEALTH = "Health",
  ENTERTAINMENT = "Entertainment",
}
