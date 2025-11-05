"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tag } from "@/features/news/types";

export const Navbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentTag = searchParams.get("tag");

  const handleTagFilter = (tag: Tag | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const isActive = (tag: Tag | null) => {
    if (!tag && !currentTag) return true;
    return currentTag === tag;
  };

  return (
    <nav className="bg-gray-600 p-4 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-lg font-bold">Hibnews</h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium mr-2">Filter by:</span>

            <button
              onClick={() => handleTagFilter(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isActive(null)
                  ? "bg-white text-gray-600"
                  : "bg-gray-500 text-white hover:bg-gray-400"
              }`}
            >
              All
            </button>

            {Object.values(Tag).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isActive(tag)
                    ? "bg-white text-gray-600"
                    : "bg-gray-500 text-white hover:bg-gray-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
