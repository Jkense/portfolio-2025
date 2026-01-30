import { notFound } from "next/navigation";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import { CustomMDX } from "app/components/mdx";
import ZoomableImage from "app/components/image/zoomable-image";
import { ArticleMetadataGrid } from "app/components/article-metadata-grid";
import Image from "next/image";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const isProject = post.metadata.type === "project";
  const hasHeroImage = post.metadata.image;
  const hasHeroImageFromMeta = post.metadata.heroImage;

  return (
    <section className="py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image || post.metadata.heroImage
              ? `${baseUrl}${post.metadata.image || post.metadata.heroImage}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Jasper Kense",
            },
          }),
        }}
      />

      {/* Title */}
      <h1 className="title font-serif font-medium text-4xl tracking-tight mb-8">
        {post.metadata.title}
      </h1>

      {/* Hero image from metadata */}
      {hasHeroImageFromMeta && (
        <div className="mb-8 rounded-lg overflow-hidden border border-border bg-white">
          <Image
            src={post.metadata.heroImage!}
            alt={post.metadata.title}
            width={896}
            height={504}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Hero image from content (backwards compatibility) */}
      {hasHeroImage && !hasHeroImageFromMeta && (
        <div className="mb-8 rounded-lg overflow-hidden border border-border bg-white">
          <Image
            src={post.metadata.image!}
            alt={post.metadata.title}
            width={896}
            height={504}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Metadata grid (projects only) */}
      {isProject && <ArticleMetadataGrid metadata={post.metadata} />}

      {/* Content */}
      <article className="prose mt-8">
        <CustomMDX
          source={post.content}
          components={{ Image: ZoomableImage }}
        />
      </article>
    </section>
  );
}
