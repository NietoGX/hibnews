import { newsService } from "../services/news-service";
import { NewsArticle } from "../types";

interface GetLatestNewsResponse {
  success: boolean;
  data: NewsArticle[];
  message?: string;
}

export const getLatestNews = async (): Promise<GetLatestNewsResponse> => {
  try {
    const response = await newsService.getLatestNews();

    if (!response.success) {
      return {
        success: false,
        data: [],
        message: response.message,
      };
    }

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
