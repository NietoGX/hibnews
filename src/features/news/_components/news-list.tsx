import { NewsArticle } from "../types";
import { News } from "./news";

export const NewsList = ({ news }: { news: NewsArticle[] }) => {
  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No news articles available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {news.map((article) => (
          <News key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};
