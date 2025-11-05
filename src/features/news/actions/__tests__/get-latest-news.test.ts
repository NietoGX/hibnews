import { getLatestNews } from "../get-latest-news";
import { newsService } from "../../services/news-service";
import { NewsArticle, Tag } from "../../types";

jest.mock("../../services/news-service");
const mockNewsService = newsService as jest.Mocked<typeof newsService>;

const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Breaking News: AI Revolution",
    content: "Artificial Intelligence is transforming the world...",
    author: "Jane Doe",
    publishedAt: new Date("2025-11-05"),
    tags: [Tag.TECHNOLOGY],
    imageUrl: "https://example.com/ai-news.jpg",
  },
  {
    id: "2",
    title: "Health Tips for Winter",
    content: "Stay healthy during the winter months with these tips...",
    author: "Dr. John Smith",
    publishedAt: new Date("2025-11-05"),
    tags: [Tag.HEALTH],
    imageUrl: "https://example.com/health-news.jpg",
  },
];

describe("getLatestNews action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return latest news successfully when service call succeeds", async () => {
    const serviceResponse = {
      success: true,
      data: mockNewsArticles,
      message: "Latest news fetched successfully",
    };
    mockNewsService.getLatestNews.mockResolvedValue(serviceResponse);

    const result = await getLatestNews();

    expect(mockNewsService.getLatestNews).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockNewsArticles);
    expect(result.data).toHaveLength(2);
    expect(result.data[0].title).toBe("Breaking News: AI Revolution");
    expect(result.data[1].author).toBe("Dr. John Smith");
    expect(result.message).toBe("Latest news fetched successfully");
  });

  it("should return error response when service call fails", async () => {
    const serviceResponse = {
      success: false,
      data: [] as NewsArticle[],
      message: "API Error: Failed to fetch news",
    };
    mockNewsService.getLatestNews.mockResolvedValue(serviceResponse);

    const result = await getLatestNews();

    expect(mockNewsService.getLatestNews).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.data).toHaveLength(0);
    expect(result.message).toBe("API Error: Failed to fetch news");
  });

  it("should handle service throwing an error", async () => {
    const errorMessage = "Network connection failed";
    mockNewsService.getLatestNews.mockRejectedValue(new Error(errorMessage));

    const result = await getLatestNews();

    expect(mockNewsService.getLatestNews).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.message).toBe(errorMessage);
  });

  it("should handle service throwing a non-Error object", async () => {
    const errorObject = { customError: "Custom error message" };
    mockNewsService.getLatestNews.mockRejectedValue(errorObject);

    const result = await getLatestNews();

    expect(mockNewsService.getLatestNews).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.message).toBe("Unknown error occurred");
  });

  it("should handle service throwing a string error", async () => {
    const stringError = "String error message";
    mockNewsService.getLatestNews.mockRejectedValue(stringError);

    const result = await getLatestNews();

    expect(mockNewsService.getLatestNews).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.message).toBe("Unknown error occurred");
  });

  it("should preserve message from service when successful", async () => {
    const customMessage = "Successfully retrieved 5 articles";
    const serviceResponse = {
      success: true,
      data: mockNewsArticles,
      message: customMessage,
    };
    mockNewsService.getLatestNews.mockResolvedValue(serviceResponse);

    const result = await getLatestNews();

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockNewsArticles);
    expect(result.message).toBe(customMessage);
  });

  it("should preserve message from service when failed", async () => {
    const customErrorMessage = "Database connection timeout";
    const serviceResponse = {
      success: false,
      data: [] as NewsArticle[],
      message: customErrorMessage,
    };
    mockNewsService.getLatestNews.mockResolvedValue(serviceResponse);

    const result = await getLatestNews();

    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.message).toBe(customErrorMessage);
  });

  it("should handle empty news array from service", async () => {
    const serviceResponse = {
      success: true,
      data: [] as NewsArticle[],
      message: "No news articles found",
    };
    mockNewsService.getLatestNews.mockResolvedValue(serviceResponse);

    const result = await getLatestNews();

    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
    expect(result.data).toHaveLength(0);
    expect(result.message).toBe("No news articles found");
  });

  it("should handle service response with undefined message", async () => {
    const serviceResponse = {
      success: true,
      data: mockNewsArticles,
      message: undefined as any,
    };
    mockNewsService.getLatestNews.mockResolvedValue(serviceResponse);

    const result = await getLatestNews();

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockNewsArticles);
    expect(result.message).toBeUndefined();
  });
});
