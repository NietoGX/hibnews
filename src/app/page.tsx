import { getLatestNews } from "@/features/news/_actions/get-latest-news";
import { NewsList } from "@/features/news/_components/news-list";

export default async function Home() {
  const { data: news } = await getLatestNews();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Noticias</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your source for the latest news and updates.
          </p>
          <NewsList news={news} />
        </div>
      </div>
    </div>
  );
}
