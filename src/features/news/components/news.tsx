"use client";

import { useNearScreen } from "@/shared/hooks/useNearScreen";
import { NewsArticle } from "../types";
import Image from "next/image";
import Link from "next/link";
import { ImagePreloader } from "@/shared/components/ImagePreloader";

interface NewsProps extends Omit<NewsArticle, "content"> {
  featured?: boolean;
}

export const News = ({
  id,
  title,
  author,
  publishedAt,
  imageUrl,
  tags,
  featured = false,
}: NewsProps) => {
  const { isNear, fromRef } = useNearScreen({
    distance: featured ? "0px" : "200px",
    once: true,
  });

  return (
    <article
      ref={fromRef}
      className={`
        bg-white shadow-md rounded-lg cursor-pointer
        transform transition-all duration-300 ease-out
        hover:shadow-xl hover:shadow-blue-500/10
        ${featured ? "p-8 lg:p-12 mb-8" : "p-6 mb-6"}
      `}
    >
      <Link href={`/news/${id}`}>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`
                px-3 py-1 font-medium rounded-full
                ${
                  featured
                    ? "text-sm bg-blue-100 text-blue-800"
                    : "text-xs bg-blue-100 text-blue-800"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>

        {imageUrl && (
          <figure
            className={`${
              featured ? "mb-6" : "mb-4"
            } overflow-hidden rounded-lg`}
          >
            <Image
              src={imageUrl}
              alt={title}
              width={featured ? 1200 : 600}
              height={featured ? 600 : 400}
              className={`
                w-full object-cover transition-all duration-500 ease-out
                hover:scale-105
                ${featured ? "h-96 lg:h-[500px]" : "h-64"}
              `}
            />
          </figure>
        )}
        <h2
          className={`
          font-bold mb-4 text-gray-900
          ${featured ? "text-4xl lg:text-5xl" : "text-2xl"}
          hover:text-blue-600
        `}
        >
          {title}
        </h2>
        <div className="text-sm text-gray-500 border-t pt-4">
          By <span className="font-medium">{author}</span> on{" "}
          <span className="font-medium">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </div>
      </Link>

      {isNear && imageUrl && (
        <ImagePreloader
          src={imageUrl}
          width={featured ? 1200 : 600}
          height={featured ? 600 : 400}
          quality={75}
          alt={`Preload: ${title}`}
        />
      )}
    </article>
  );
};
