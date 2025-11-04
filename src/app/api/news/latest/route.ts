import { NextResponse } from "next/server";
import { NewsArticle, Tag } from "@/features/news/types";

const sampleNews: NewsArticle[] = [
  {
    id: "1",
    title: "Revolutionary AI Breakthrough Transforms Healthcare Diagnostics",
    content:
      "Scientists have developed a groundbreaking AI system that can detect diseases with 99% accuracy, potentially saving millions of lives through early detection. The technology uses advanced machine learning algorithms to analyze medical scans and identify patterns that human doctors might miss.",
    author: "Dr. Sarah Johnson",
    publishedAt: new Date("2024-01-15T10:30:00Z"),
    tags: [Tag.TECHNOLOGY, Tag.HEALTH],
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
  },
  {
    id: "2",
    title: "New Smartphone Battery Technology Promises Week-Long Charge",
    content:
      "A startup has unveiled a revolutionary battery technology that could keep smartphones running for up to 7 days on a single charge. The breakthrough uses solid-state battery materials that are safer and more efficient than traditional lithium-ion batteries.",
    author: "Michael Chen",
    publishedAt: new Date("2024-01-14T14:20:00Z"),
    tags: [Tag.TECHNOLOGY],
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
  },
  {
    id: "3",
    title: "Groundbreaking Study Reveals Benefits of Mediterranean Diet",
    content:
      "A comprehensive 10-year study involving over 50,000 participants has confirmed that the Mediterranean diet significantly reduces the risk of heart disease and cognitive decline. Researchers attribute the benefits to high consumption of olive oil, fish, and fresh vegetables.",
    author: "Dr. Elena Rodriguez",
    publishedAt: new Date("2024-01-13T09:15:00Z"),
    tags: [Tag.HEALTH],
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
  },
  {
    id: "4",
    title: "Blockbuster Movie Shatters Box Office Records",
    content:
      'The highly anticipated sci-fi epic "Cosmic Odyssey" has broken opening weekend records, earning $500 million globally. The film, starring Emma Thompson and Chris Johnson, has received critical acclaim for its stunning visual effects and compelling storyline.',
    author: "Jessica Martinez",
    publishedAt: new Date("2024-01-12T18:45:00Z"),
    tags: [Tag.ENTERTAINMENT],
    imageUrl:
      "https://images.unsplash.com/photo-1489599457952-9b1d8b5b4c1f?w=800",
  },
  {
    id: "5",
    title: "Quantum Computer Solves Complex Problem in Minutes",
    content:
      "IBM researchers have demonstrated a quantum computer capable of solving optimization problems that would take traditional supercomputers thousands of years. The breakthrough marks a significant milestone in the development of practical quantum computing applications.",
    author: "Prof. James Wilson",
    publishedAt: new Date("2024-01-11T11:00:00Z"),
    tags: [Tag.TECHNOLOGY],
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
  },
  {
    id: "6",
    title: "Revolutionary Gene Therapy Shows Promise for Rare Diseases",
    content:
      "Medical researchers have successfully used CRISPR gene editing to treat a rare genetic disorder in clinical trials. The therapy shows promise for treating hundreds of other genetic conditions, offering hope to millions of patients worldwide.",
    author: "Dr. Amanda Foster",
    publishedAt: new Date("2024-01-10T16:30:00Z"),
    tags: [Tag.HEALTH, Tag.TECHNOLOGY],
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
  },
  {
    id: "7",
    title: "Music Festival Announces Star-Studded Lineup",
    content:
      "The annual Summer Music Festival has announced its biggest lineup yet, featuring over 100 artists across multiple genres. Headliners include international superstars and emerging talents, promising an unforgettable experience for music fans.",
    author: "Ryan Thompson",
    publishedAt: new Date("2024-01-09T12:00:00Z"),
    tags: [Tag.ENTERTAINMENT],
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
  },
  {
    id: "8",
    title: "New Fitness App Uses AI to Create Personalized Workouts",
    content:
      "A revolutionary fitness app launched this week uses artificial intelligence to create customized workout plans based on users' goals, fitness level, and preferences. The app adapts in real-time to progress and provides form correction through smartphone cameras.",
    author: "Lisa Anderson",
    publishedAt: new Date("2024-01-08T08:45:00Z"),
    tags: [Tag.TECHNOLOGY, Tag.HEALTH],
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
  },
  {
    id: "9",
    title: "Broadway Revival Breaks All Attendance Records",
    content:
      'The highly anticipated revival of the classic musical "Midnight in Manhattan" has broken all Broadway attendance records, with sold-out shows extending through the end of the year. Critics are calling it "the theatrical event of the decade."',
    author: "David Mitchell",
    publishedAt: new Date("2024-01-07T19:20:00Z"),
    tags: [Tag.ENTERTAINMENT],
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
  },
  {
    id: "10",
    title: "Breakthrough in Alzheimer's Prevention Research",
    content:
      "Researchers have identified a new compound that shows remarkable promise in preventing the onset of Alzheimer's disease in early clinical trials. The discovery could revolutionize how we approach neurodegenerative diseases and aging.",
    author: "Dr. Robert Chang",
    publishedAt: new Date("2024-01-06T13:15:00Z"),
    tags: [Tag.HEALTH],
    imageUrl:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800",
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: sampleNews,
      total: sampleNews.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
