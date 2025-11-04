import { newsService } from "../_services/news-service";
import { NewsArticle } from "../types";

interface GetLatestNewsResponse {
  success: boolean;
  data: NewsArticle[];
  message?: string;
}

export const getLatestNews = async (): Promise<GetLatestNewsResponse> => {
  try {
    const news = (await newsService.getLatestNews()).data;
    return {
      success: true,
      data: news,
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
