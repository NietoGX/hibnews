import { z } from "zod";
import { getAllNews, findNewsById } from "@/lib/news-data";
import { NewsArticle, Tag } from "../types";

const newsArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  publishedAt: z.string().or(z.date()),
  tags: z.array(z.nativeEnum(Tag)),
  imageUrl: z.string().optional(),
});

const newsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(newsArticleSchema),
  total: z.number(),
});

const singleNewsResponseSchema = z.object({
  success: z.boolean(),
  data: newsArticleSchema,
});

type ServiceResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

type ValidatedNewsArticle = z.infer<typeof newsArticleSchema>;

class NewsService {
  async getLatestNews(): Promise<ServiceResponse<NewsArticle[]>> {
    try {
      const newsData = getAllNews();

      // Validate the data
      const validatedResponse = newsResponseSchema.parse({
        success: true,
        data: newsData,
        total: newsData.length,
      });

      const processedNews = validatedResponse.data.map(
        (article: ValidatedNewsArticle) => ({
          ...article,
          publishedAt: new Date(article.publishedAt),
        })
      );

      return {
        success: true,
        data: processedNews,
        message: "Latest news fetched successfully",
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          data: [],
          message: `Invalid data response: ${error.issues
            .map((e) => e.path.join("."))
            .join(", ")}`,
        };
      }

      return {
        success: false,
        data: [],
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  async getNewsById(id: string): Promise<ServiceResponse<NewsArticle | null>> {
    try {
      const newsArticle = findNewsById(id);

      if (!newsArticle) {
        return {
          success: false,
          data: null,
          message: `News article ${id} not found`,
        };
      }

      // Validate the data
      const validatedResponse = singleNewsResponseSchema.parse({
        success: true,
        data: newsArticle,
      });

      const processedNews = {
        ...validatedResponse.data,
        publishedAt: new Date(validatedResponse.data.publishedAt),
      };

      return {
        success: true,
        data: processedNews,
        message: `News article ${id} fetched successfully`,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          data: null,
          message: `Invalid data response: ${error.issues
            .map((e) => e.path.join("."))
            .join(", ")}`,
        };
      }

      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}

export const newsService = new NewsService();
