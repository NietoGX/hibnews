import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getNewsById } from "@/features/news/actions/get-news-by-id";
import { getAllNewsIds } from "@/features/news/actions/get-all-news-ids";

interface NewsPageProps {
  params: Promise<{
    id: string;
  }>;
}
export const dynamic = "force-static";
export const revalidate = 60;

export async function generateStaticParams() {
  const ids = await getAllNewsIds();

  return ids.map((id) => ({
    id: id,
  }));
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;
  const { data: news, success } = await getNewsById(id);

  if (!success || !news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>

            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {news.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-gray-600 border-b pb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {news.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{news.author}</p>
                    <p className="text-sm">
                      {new Date(news.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </header>

            {news.imageUrl && (
              <div className="mb-8">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  width={800}
                  height={400}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {news.content}
              </div>
            </div>

            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Published on {new Date(news.publishedAt).toLocaleDateString()}
                </p>
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Read more articles →
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
