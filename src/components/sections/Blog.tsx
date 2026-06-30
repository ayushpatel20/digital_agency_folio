"use client";

import Image from "next/image";
import { Calendar, Tag, ArrowUpRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  author: string;
  publishedAt?: string | Date;
}

interface BlogProps {
  posts?: BlogPost[];
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI in Product Development",
    slug: "future-of-ai-product-development",
    excerpt: "How artificial intelligence is revolutionizing the way we build, test, and ship software products in 2025.",
    featuredImage: "/images/blog-1.png",
    category: "AI/ML",
    author: "Alex Rivera",
    publishedAt: "2025-06-15",
  },
  {
    id: "2",
    title: "Building Scalable Startups: A Technical Blueprint",
    slug: "building-scalable-startups-technical-blueprint",
    excerpt: "A deep dive into the architectural decisions and engineering practices that allow startups to scale from 0 to millions of users.",
    featuredImage: "/images/blog-2.png",
    category: "Engineering",
    author: "Zara Kim",
    publishedAt: "2025-06-10",
  },
  {
    id: "3",
    title: "Dark Mode Design Systems: A Complete Guide",
    slug: "dark-mode-design-systems-complete-guide",
    excerpt: "Everything you need to know about creating beautiful, accessible dark mode design systems that users actually love.",
    featuredImage: "/images/blog-3.png",
    category: "Design",
    author: "Devon Hart",
    publishedAt: "2025-06-05",
  },
];

export default function BlogSection({ posts = DEFAULT_POSTS }: BlogProps) {
  const formatDate = (date?: string | Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="blog" className="section-padding relative">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14">
          <div className="max-w-xl">
            <div className="section-label mb-4">Latest Insights</div>
            <h2 className="section-heading text-white">
              Learn from our{" "}
              <span className="gradient-text">Recent Journal</span>
            </h2>
          </div>
          <a
            href="/blog"
            className="group flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            Explore all posts
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group glass-card overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                {post.featuredImage && (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge text-xs">{post.category}</span>
                </div>

                {/* Arrow icon */}
                <div
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl glass flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-primary/40 transition-all duration-300"
                >
                  <ArrowUpRight size={15} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Calendar size={11} />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    By {post.author}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
