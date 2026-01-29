# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server

## Codebase Overview

This is a portfolio site built with Next.js 16 featuring an integrated blog. The application is fully typed with TypeScript and styled with Tailwind CSS v4.

### Architecture

**Next.js App Router Structure:**
- Root layout (`app/layout.tsx`) - Sets up metadata, navbar, footer, and Vercel integrations (Analytics, Speed Insights)
- `app/page.tsx` - Home page with project showcase and experience accordion
- `app/blog/` - Blog listing and metadata utilities
- `app/[slug]/page.tsx` - Dynamic portfolio project pages (e.g., `/cacao-user-research`, `/leapfrog`)
- `app/og/` - Open Graph image generation (used for social sharing previews)
- `app/resume/` - Resume page
- `app/rss/` - RSS feed generation
- `app/sitemap.ts` - XML sitemap for SEO
- `app/robots.ts` - robots.txt configuration

### Content & Blog System

Blog posts are stored as `.mdx` files in `app/blog/posts/` with YAML frontmatter. The utility functions in `app/blog/utils.ts` handle:
- **Frontmatter parsing** - Extracts metadata (title, publishedAt, summary, type, image, projectLink, favicon, priority) from MDX files
- **File reading** - `getBlogPosts()` reads all posts and returns structured data with slug, metadata, and content
- **Date formatting** - `formatDate()` formats dates with optional relative time (e.g., "2d ago")

Each post file is named like `payment-portal-coeo.mdx` and generates a slug automatically for routing.

### Component Hierarchy

- `nav.tsx` - Navigation bar with theme toggle
- `footer.tsx` - Footer component
- `posts.tsx` - Blog posts list/grid component
- `experience-accordion.tsx` - Expandable experience/project items
- `lets-connect.tsx` - Contact/CTA section
- `mdx.tsx` - MDX components mapping (custom rendering for headings, links, code blocks, etc.)
- `mdx-client.tsx` - Client-side MDX wrapper
- `image/` - Image-related components

### Styling & Configuration

- **Tailwind CSS v4** with `@tailwindcss/postcss` integration
- **Geist font** from Vercel for consistent typography
- **Dark mode support** - Built-in with Tailwind's dark class
- `global.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration (note: this was recently added in app directory)

### External Integrations

- **Vercel Analytics & Speed Insights** - Performance monitoring and user analytics
- **MDX Remote** - For parsing and rendering MDX content
- **Sugar High** - Syntax highlighting for code blocks
- **Framer Motion** - Animation library for micro-interactions

### Image Optimization

`next.config.js` configures remote image patterns for:
- `www.cacao.care` - Cacao case study images
- `leapfrogapp.com` - Leapfrog case study images
- `www.google.com` - Favicon service

### Current State

The project has uncommitted changes in:
- `app/components/footer.tsx` - Footer modifications
- `app/components/nav.tsx` - Navigation updates
- `app/global.css` - Global style updates
- `app/layout.tsx` - Layout tweaks
- `app/tailwind.config.js` - New Tailwind config file added

## Key Points

- The site is optimized for SEO with metadata, robots.txt, and JSON-LD schema
- RSS feed generation is available at `app/rss/`
- Dynamic OG image generation supports social sharing previews
- Posts support custom project links and favicon display
- The blog system uses priority field for sorting featured posts
