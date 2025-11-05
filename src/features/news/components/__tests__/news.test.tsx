import { render, screen } from "@testing-library/react";
import { News } from "../news";
import { NewsArticle, Tag } from "../../types";

jest.mock("next/image", () => {
  return function MockImage({ src, alt, className, ...props }: any) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        data-testid="next-image"
        {...props}
      />
    );
  };
});

jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const mockNewsProps: Omit<NewsArticle, "content"> = {
  id: "test-123",
  title: "Test News Article Title",
  author: "John Doe",
  publishedAt: new Date("2025-11-05T10:30:00.000Z"),
  imageUrl: "https://example.com/test-image.jpg",
  tags: [Tag.TECHNOLOGY, Tag.HEALTH],
};

const mockNewsPropsWithoutImage: Omit<NewsArticle, "content"> = {
  id: "test-456",
  title: "Test Article Without Image",
  author: "Jane Smith",
  publishedAt: new Date("2025-11-04T15:45:00.000Z"),
  tags: [Tag.ENTERTAINMENT],
};

describe("News Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render with all required props", () => {
      render(<News {...mockNewsProps} />);

      expect(screen.getByRole("article")).toBeInTheDocument();

      expect(screen.getByText("Test News Article Title")).toBeInTheDocument();

      expect(screen.getByText("John Doe")).toBeInTheDocument();

      expect(screen.getByText("11/5/2025")).toBeInTheDocument();

      expect(screen.getByText("Technology")).toBeInTheDocument();
      expect(screen.getByText("Health")).toBeInTheDocument();
    });

    it("should render with minimal required props (no image)", () => {
      render(<News {...mockNewsPropsWithoutImage} />);

      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(
        screen.getByText("Test Article Without Image")
      ).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("11/4/2025")).toBeInTheDocument();
      expect(screen.getByText("Entertainment")).toBeInTheDocument();
    });

    it("should have correct link href", () => {
      render(<News {...mockNewsProps} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/news/test-123");
    });
  });

  describe("Image Rendering", () => {
    it("should render image when imageUrl is provided", () => {
      render(<News {...mockNewsProps} />);

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        "https://example.com/test-image.jpg"
      );
      expect(image).toHaveAttribute("alt", "Test News Article Title");
    });

    it("should not render image when imageUrl is not provided", () => {
      render(<News {...mockNewsPropsWithoutImage} />);

      expect(screen.queryByTestId("next-image")).not.toBeInTheDocument();
    });

    it("should render image with correct dimensions for regular article", () => {
      render(<News {...mockNewsProps} />);

      const image = screen.getByTestId("next-image");
      expect(image).toHaveAttribute("width", "600");
      expect(image).toHaveAttribute("height", "400");
    });

    it("should render image with correct dimensions for featured article", () => {
      render(<News {...mockNewsProps} featured={true} />);

      const image = screen.getByTestId("next-image");
      expect(image).toHaveAttribute("width", "1200");
      expect(image).toHaveAttribute("height", "600");
    });
  });

  describe("Tags Rendering", () => {
    it("should render single tag correctly", () => {
      render(<News {...mockNewsPropsWithoutImage} />);

      expect(screen.getByText("Entertainment")).toBeInTheDocument();
    });

    it("should render multiple tags correctly", () => {
      render(<News {...mockNewsProps} />);

      expect(screen.getByText("Technology")).toBeInTheDocument();
      expect(screen.getByText("Health")).toBeInTheDocument();

      const tagContainer = screen.getByText("Technology").parentElement;
      expect(tagContainer).toContainElement(screen.getByText("Health"));
    });
  });

  describe("Date Formatting", () => {
    it("should format different dates correctly", () => {
      const testProps = {
        ...mockNewsPropsWithoutImage,
        publishedAt: new Date("2024-12-25T00:00:00.000Z"),
      };

      render(<News {...testProps} />);

      expect(screen.getByText("12/25/2024")).toBeInTheDocument();
    });
  });

  describe("Author Display", () => {
    it("should display author name correctly", () => {
      render(<News {...mockNewsProps} />);

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toHaveClass("font-medium");
    });

    it("should show 'By' prefix before author name", () => {
      render(<News {...mockNewsProps} />);

      const footer = screen.getByText("John Doe").parentElement;
      expect(footer).toBeInTheDocument();
      expect(footer?.textContent).toContain("By John Doe");
    });

    it("should show 'on' before date", () => {
      render(<News {...mockNewsProps} />);

      const footer = screen.getByText("11/5/2025").parentElement;
      expect(footer).toBeInTheDocument();
      expect(footer?.textContent).toContain("on 11/5/2025");
    });
  });
});
