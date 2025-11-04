import { z } from "zod";
import { api } from "@/lib/http-client";
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
      const response = await api.get("http://localhost:3000/api/news/latest");

      if (!response) {
        throw new Error("No response from server");
      }

      const validatedResponse = newsResponseSchema.parse(response);

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
          message: `Invalid API response: ${error.issues
            .map((e: z.ZodIssue) => e.path.join("."))
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
      const response = await api.get(`http://localhost:3000/api/news/${id}`);

      if (!response) {
        throw new Error("No response from server");
      }

      const validatedResponse = singleNewsResponseSchema.parse(response);

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
          message: `Invalid API response: ${error.issues
            .map((e: z.ZodIssue) => e.path.join("."))
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
