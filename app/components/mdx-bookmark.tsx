import { GeistMono } from "geist/font/mono";

type BookmarkProps = {
  label: string;
  section?: "design" | "engineering";
  domains?: string;
  slug?: string;
};

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function parseDomains(domains?: string): string[] {
  if (!domains) return [];

  return domains
    .split(",")
    .map((domain) => domain.trim())
    .filter(Boolean);
}

export function Bookmark({
  label,
  section = "engineering",
  domains,
  slug,
}: BookmarkProps) {
  const id = slug || slugify(`${section}-${label}`);
  const domainList = parseDomains(domains);

  return (
    <div
      id={id}
      data-toc-bookmark={section}
      data-toc-label={label}
      data-toc-domains={domainList.join(", ")}
      className={`block h-px w-full scroll-mt-24 opacity-0 pointer-events-none ${GeistMono.className}`}
      aria-hidden="true"
    />
  );
}
