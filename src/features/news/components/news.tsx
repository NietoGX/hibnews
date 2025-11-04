import { NewsArticle } from "../types";
import Image from "next/image";
import Link from "next/link";

export const News = ({
  id,
  title,
  content,
  author,
  publishedAt,
  imageUrl,
  tags,
}: NewsArticle) => {
  return (
    <Link href={`/news/${id}`}>
      <article className="bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow cursor-pointer">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>

      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={400}
            className="w-full h-64 object-cover rounded"
          />
        </div>
      )}

      <p className="text-gray-700 mb-4 leading-relaxed">{content}</p>

      <div className="text-sm text-gray-500 border-t pt-4">
        By <span className="font-medium">{author}</span> on{" "}
        <span className="font-medium">
          {new Date(publishedAt).toLocaleDateString()}
        </span>
      </div>
    </article>
    </Link>
  );
};
