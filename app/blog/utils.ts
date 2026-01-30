import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  publishedAt: string;
  finishedAt?: string;
  summary: string;
  image?: string;
  heroImage?: string; // Hero image displayed above metadata grid
  type: string;
  projectLink?: string;
  priority?: number;
  favicon?: string;
  // Display metadata
  client?: string; // e.g., "coeo", "ikea", "chemistry"
  shortTitle?: string; // Short title for list display, e.g., "payment portal"
  // Project-specific metadata (optional)
  timeline?: string; // e.g., "Jan 2022 - Jun 2023"
  team?: string; // Comma-separated: "Jasper Kense, Operations Team"
  role?: string; // Comma-separated: "Lead Designer, UX Researcher"
  skills?: string; // Comma-separated: "Figma, User Research"
  references?: string; // Format: "title:url,title:url"
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    (metadata as any)[key.trim()] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let baseSlug = path.basename(file, path.extname(file));
    let typeSlug = metadata.type
      ? metadata.type.replace(/\s+/g, "-").toLowerCase()
      : "blog-post";
    let slug = `${baseSlug}`;
    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
