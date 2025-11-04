import { newsService } from "../services/news-service";

export const getAllNewsIds = async (): Promise<string[]> => {
  try {
    const response = await newsService.getLatestNews();

    if (!response.success) {
      console.error("Failed to get news for IDs:", response.message);
      return [];
    }

    return response.data.map((article) => article.id);
  } catch (error) {
    console.error("Error in getAllNewsIds:", error);
    return [];
  }
};
