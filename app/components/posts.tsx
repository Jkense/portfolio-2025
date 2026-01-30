import Link from "next/link";
import { getBlogPosts } from "app/blog/utils";
import { GeistMono } from "geist/font/mono";

type Props = {
  filterType?: "project" | "publication";
};

export function BlogPosts({ filterType }: Props = {}) {
  let allBlogs = getBlogPosts();

  const sortedPosts = allBlogs
    .filter((post) => (filterType ? post.metadata.type === filterType : true))
    .sort((a, b) => {
      const aPriority = a.metadata.priority ?? 0;
      const bPriority = b.metadata.priority ?? 0;
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      const aOngoing = a.metadata.finishedAt === "ongoing";
      const bOngoing = b.metadata.finishedAt === "ongoing";
      if (aOngoing && !bOngoing) return -1;
      if (!aOngoing && bOngoing) return 1;
      if (
        new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ) {
        return -1;
      }
      return 1;
    });

  return (
    <div className="flex flex-col gap-4">
      {sortedPosts.map((post) => {
        const year = new Date(post.metadata.publishedAt).getFullYear();
        const isOngoing = post.metadata.finishedAt === "ongoing";
        const client = post.metadata.client || "";
        const displayTitle = post.metadata.shortTitle || post.metadata.title;

        return (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group flex flex-col gap-2"
          >
            {/* First line: year + client/tag */}
            <div className={`flex gap-6 text-sm text-muted ${GeistMono.className}`}>
              <span>{year}</span>
              <span>{isOngoing ? "ongoing" : client}</span>
            </div>
            {/* Second line: title */}
            <p className="text-base group-hover:text-primary transition-colors">
              {displayTitle}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
