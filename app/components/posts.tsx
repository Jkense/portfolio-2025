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

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => {
          const faviconUrl = getFaviconUrl(post.metadata.projectLink);
          return (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4 w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:dark:bg-slate-950"
              href={`/${post.slug}`}
            >
              <div className="w-full flex flex-col space-x-0 md:space-x-2">
                <div className="flex flex-row space-x-2 items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-2">
                    {faviconUrl && (
                      <a
                        href={post.metadata.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
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
                    <p className="text-gray-600 dark:text-gray-400 tabular-nums text-sm">
                      {formatDate(post.metadata.publishedAt, false)}
                    </p>
                  </div>
                  <span className="ml-2 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 align-middle">
                    {post.metadata.type}
                  </span>
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
