import { NextResponse } from "next/server";
import { getAllNews } from "@/lib/news-data";

export async function GET() {
  try {
    const news = getAllNews();

    return NextResponse.json({
      success: true,
      data: news,
      total: news.length,
    });
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
