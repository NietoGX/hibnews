import { newsService } from "../news-service";
import { NewsArticle, Tag } from "../../types";
import { api } from "@/lib/http-client";
jest.mock("@/lib/http-client");
const mockApi = api as jest.Mocked<typeof api>;
const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Test Article 1",
    content: "Test content 1",
    author: "Test Author 1",
    publishedAt: new Date("2025-11-05"),
    tags: [Tag.TECHNOLOGY],
    imageUrl: "https://example.com/image1.jpg",
  },
  {
    id: "2",
    title: "Test Article 2",
    content: "Test content 2",
    author: "Test Author 2",
    publishedAt: new Date("2025-11-05"),
    tags: [Tag.HEALTH],
    imageUrl: "https://example.com/image2.jpg",
  },
];

const mockSingleNewsArticle: NewsArticle = {
  id: "1",
  title: "Test Article 1",
  content: "Test content 1",
  author: "Test Author 1",
  publishedAt: new Date("2025-11-05"),
  tags: [Tag.TECHNOLOGY],
  imageUrl: "https://example.com/image1.jpg",
};

describe("NewsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getLatestNews", () => {
    it("should return latest news successfully", async () => {
      const apiResponse = {
        success: true,
        data: mockNewsArticles.map((article) => ({
          ...article,
          publishedAt: article.publishedAt.toISOString(),
        })),
        total: mockNewsArticles.length,
      };
      mockApi.get.mockResolvedValue(apiResponse);

      const result = await newsService.getLatestNews();

      expect(mockApi.get).toHaveBeenCalledWith(
        "http://localhost:3000/api/news/latest"
      );
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].id).toBe("1");
      expect(result.data[0].title).toBe("Test Article 1");
      expect(result.data[0].publishedAt).toBeInstanceOf(Date);
      expect(result.message).toBe("Latest news fetched successfully");
    });

    it("should handle empty news array successfully", async () => {
      const apiResponse = {
        success: true,
        data: [],
        total: 0,
      };
      mockApi.get.mockResolvedValue(apiResponse);

      const result = await newsService.getLatestNews();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(0);
      expect(result.message).toBe("Latest news fetched successfully");
    });

    it("should handle API error response", async () => {
      const apiError = new Error("API Error (500): Internal Server Error");
      mockApi.get.mockRejectedValue(apiError);

      const result = await newsService.getLatestNews();

      expect(result.success).toBe(false);
      expect(result.data).toEqual([]);
      expect(result.message).toBe("API Error (500): Internal Server Error");
    });

    it("should handle network error", async () => {
      const networkError = new Error(
        "Network Error: Failed to connect to http://localhost:3000/api/news/latest. fetch failed"
      );
      mockApi.get.mockRejectedValue(networkError);

      const result = await newsService.getLatestNews();

      expect(result.success).toBe(false);
      expect(result.data).toEqual([]);
      expect(result.message).toContain("Network Error");
    });

    it("should handle malformed API response (Zod validation error)", async () => {
      const malformedResponse = {
        success: true,
        data: [
          {
            id: "1",
            title: "Test Article",
          },
        ],
      };
      mockApi.get.mockResolvedValue(malformedResponse);

      const result = await newsService.getLatestNews();

      expect(result.success).toBe(false);
      expect(result.data).toEqual([]);
      expect(result.message).toContain("Invalid API response");
      expect(result.message).toContain("data.0.content");
    });

    it("should handle null response from API", async () => {
      mockApi.get.mockResolvedValue(null);

      const result = await newsService.getLatestNews();

      expect(result.success).toBe(false);
      expect(result.data).toEqual([]);
      expect(result.message).toBe("No response from server");
    });

    it("should process date strings correctly", async () => {
      const apiResponse = {
        success: true,
        data: [
          {
            ...mockSingleNewsArticle,
            publishedAt: "2025-11-05T00:00:00.000Z",
          },
        ],
        total: 1,
      };
      mockApi.get.mockResolvedValue(apiResponse);

      const result = await newsService.getLatestNews();

      expect(result.success).toBe(true);
      expect(result.data[0].publishedAt).toBeInstanceOf(Date);
      expect(result.data[0].publishedAt.getFullYear()).toBe(2025);
    });
  });

  describe("getNewsById", () => {
    it("should return news article by ID successfully", async () => {
      const apiResponse = {
        success: true,
        data: {
          ...mockSingleNewsArticle,
          publishedAt: mockSingleNewsArticle.publishedAt.toISOString(),
        },
      };
      mockApi.get.mockResolvedValue(apiResponse);

      const result = await newsService.getNewsById("1");

      expect(mockApi.get).toHaveBeenCalledWith(
        "http://localhost:3000/api/news/1"
      );
      expect(result.success).toBe(true);
      expect(result.data).not.toBeNull();
      expect(result.data!.id).toBe("1");
      expect(result.data!.title).toBe("Test Article 1");
      expect(result.data!.publishedAt).toBeInstanceOf(Date);
      expect(result.message).toBe("News article 1 fetched successfully");
    });

    it("should handle non-existent article ID", async () => {
      const apiError = new Error("API Error (404): Not Found");
      mockApi.get.mockRejectedValue(apiError);

      const result = await newsService.getNewsById("999");

      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toBe("API Error (404): Not Found");
    });

    it("should handle malformed single article response", async () => {
      const malformedResponse = {
        success: true,
        data: {
          id: "1",
          title: "Test Article",
        },
      };
      mockApi.get.mockResolvedValue(malformedResponse);

      const result = await newsService.getNewsById("1");

      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toContain("Invalid API response");
      expect(result.message).toContain("data.content");
    });

    it("should handle null response for single article", async () => {
      mockApi.get.mockResolvedValue(null);

      const result = await newsService.getNewsById("1");

      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toBe("No response from server");
    });

    it("should handle network error for single article", async () => {
      const networkError = new Error(
        "Network Error: Failed to connect to http://localhost:3000/api/news/1. fetch failed"
      );
      mockApi.get.mockRejectedValue(networkError);

      const result = await newsService.getNewsById("1");

      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toContain("Network Error");
    });

    it("should handle empty string ID", async () => {
      const apiError = new Error("API Error (404): Not Found");
      mockApi.get.mockRejectedValue(apiError);

      const result = await newsService.getNewsById("");

      expect(mockApi.get).toHaveBeenCalledWith(
        "http://localhost:3000/api/news/"
      );
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
    });

    it("should process date string for single article correctly", async () => {
      const apiResponse = {
        success: true,
        data: {
          ...mockSingleNewsArticle,
          publishedAt: "2025-11-05T10:30:00.000Z",
        },
      };
      mockApi.get.mockResolvedValue(apiResponse);

      const result = await newsService.getNewsById("1");

      expect(result.success).toBe(true);
      expect(result.data!.publishedAt).toBeInstanceOf(Date);
      expect(result.data!.publishedAt.getFullYear()).toBe(2025);
      expect(result.data!.publishedAt.getMonth()).toBe(10);
      expect(result.data!.publishedAt.getDate()).toBe(5);
    });
  });
});
