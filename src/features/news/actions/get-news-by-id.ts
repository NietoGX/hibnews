import { newsService } from "../services/news-service";
import { NewsArticle } from "../types";

interface GetNewsByIdResponse {
  success: boolean;
  data: NewsArticle | null;
  message?: string;
}

export const getNewsById = async (id: string): Promise<GetNewsByIdResponse> => {
  try {
    const response = await newsService.getNewsById(id);

    if (!response.success) {
      return {
        success: false,
        data: null,
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
      data: null,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
