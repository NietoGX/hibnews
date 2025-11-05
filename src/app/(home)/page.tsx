import { getLatestNews } from "@/features/news/actions/get-latest-news";
import { News } from "@/features/news/components/news";
import { Tag } from "@/features/news/types";
import { Metadata } from "next";

export const revalidate = 60;

interface HomeProps {
  searchParams: {
    tag?: string;
  };
}

export function generateMetadata({ searchParams }: HomeProps): Metadata {
  const tag = searchParams.tag as Tag | undefined;

  if (tag) {
    return {
      title: `Noticias - ${tag}`,
      description: `Latest ${tag} news and updates.`,
    };
  }

  return {
    title: "Noticias",
    description: "Your source for the latest news and updates.",
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const tagParam = searchParams.tag as Tag | undefined;

  // Validate tag parameter
  let tag: Tag | undefined;
  if (tagParam && Object.values(Tag).includes(tagParam)) {
    tag = tagParam;
  }

  const { data: news } = await getLatestNews(tag);

  const getFilterTitle = () => {
    if (!tag) return "Noticias";
    return `Noticias - ${tag}`;
  };

  const getFilterDescription = () => {
    if (!tag) {
      return "Your source for the latest news and updates.";
    }
    return `Latest ${tag} news and updates.`;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getFilterTitle()}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{getFilterDescription()}</p>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {tag
                  ? `No news articles available for ${tag}.`
                  : "No news articles available."}
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
