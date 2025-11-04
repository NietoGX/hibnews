import { newsService } from "../services/news-service";
import { NewsArticle } from "../types";

interface GetNewsByIdResponse {
  success: boolean;
  data: NewsArticle | null;
  message?: string;
}

export const getNewsById = async (id: string): Promise<GetNewsByIdResponse> => {
  try {
    const news = await newsService.getNewsById(id);

    if (!news) {
      return {
        success: false,
        data: null,
        message: "News article not found",
      };
    }

    return {
      success: true,
      data: news,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
