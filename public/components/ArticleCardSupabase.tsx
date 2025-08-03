import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  published_at: string;
  author: string;
}

export default function ArticleCardSupabase({ article }: { article: Article }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {article.image_url && (
        <div className="relative h-48 w-full">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs font-semibold text-red-500 uppercase">
          {article.category}
        </span>
        <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{formatDate(article.published_at)}</span>
          <span>{article.author}</span>
        </div>
      </div>
    </div>
  );
}
