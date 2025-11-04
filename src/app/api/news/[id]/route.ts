import { NextRequest, NextResponse } from "next/server";
import { findNewsById } from "@/lib/news-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "News ID is required" },
        { status: 400 }
      );
    }

    const news = findNewsById(id);

    if (!news) {
      return NextResponse.json(
        { success: false, error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news article:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news article" },
      { status: 500 }
    );
  }
}