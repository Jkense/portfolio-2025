import Link from "next/link";
import Image from "next/image";
import { formatDate, getBlogPosts } from "app/blog/utils";

function getFaviconUrl(projectLink?: string) {
  if (!projectLink) return null;
  try {
    const url = new URL(projectLink);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
  } catch {
    return null;
  }
}

type Props = {
  filterType?: "project" | "publication";
};

export function BlogPosts({ filterType }: Props = {}) {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .filter((post) =>
          filterType ? post.metadata.type === filterType : true
        )
        .sort((a, b) => {
          // First sort by priority (higher priority first)
          const aPriority = a.metadata.priority ?? 0;
          const bPriority = b.metadata.priority ?? 0;
          if (aPriority !== bPriority) {
            return bPriority - aPriority; // Higher priority first
          }
          // If priorities are equal, use existing logic
          const aOngoing = a.metadata.finishedAt === "ongoing";
          const bOngoing = b.metadata.finishedAt === "ongoing";
          if (aOngoing && !bOngoing) return -1;
          if (!aOngoing && bOngoing) return 1;
          // If both are ongoing or both are not, sort by publishedAt desc
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => {
          // Use custom favicon if provided, otherwise fall back to Google favicon service
          const faviconUrl = post.metadata.favicon
            ? post.metadata.favicon
            : getFaviconUrl(post.metadata.projectLink);
          return (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4 w-full p-4 border border-slate-200 rounded-lg bg-white dark:bg-white hover:bg-slate-100 hover:dark:bg-slate-950 cursor-pointer"
              href={`/${post.slug}`}
            >
              <div className="w-full flex flex-col space-x-0 md:space-x-2">
                <div className="flex flex-row space-x-2 items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-2">
                    {faviconUrl && (
                      <a
                        href={post.metadata.projectLink || "#"}
                        target={
                          post.metadata.projectLink ? "_blank" : undefined
                        }
                        rel={
                          post.metadata.projectLink
                            ? "noopener noreferrer"
                            : undefined
                        }
                        title="Project link"
                        className="inline-block w-5 h-5 align-middle"
                      >
                        <Image
                          src={faviconUrl}
                          alt="Project favicon"
                          width={32}
                          height={32}
                          className="rounded"
                        />
                      </a>
                    )}
                    <div className="flex flex-row text-xs text-gray-600 dark:text-gray-400">
                      <p className="tabular-nums">
                        {formatDate(post.metadata.publishedAt, false)}
                      </p>
                      {post.metadata.finishedAt &&
                        post.metadata.finishedAt !== "ongoing" && (
                          <p className="tabular-nums">
                            -{formatDate(post.metadata.finishedAt, false)}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-1 ml-2">
                    {post.metadata.finishedAt === "ongoing" && (
                      <span className="px-2 py-0.5 bg-white rounded dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 align-middle">
                        Ongoing
                      </span>
                    )}

                    <span className="ml-2 px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 align-middle">
                      {post.metadata.type}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-900 dark:text-gray-100">
                {post.metadata.title}
              </p>
            </Link>
          );
        })}
    </div>
  );
}
