import { getLatestNews } from "@/features/news/actions/get-latest-news";
import { News } from "@/features/news/components/news";

export const revalidate = 60;

export default async function Home() {
  const { data: news } = await getLatestNews();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Noticias</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your source for the latest news and updates.
          </p>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No news articles available.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {news[0] && (
                <div className="w-full">
                  <News key={news[0].id} {...news[0]} featured={true} />
                </div>
              )}

              {news.length > 1 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {news.slice(1).map((article) => (
                    <News key={article.id} {...article} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
