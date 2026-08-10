import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BlogCard } from "@/modules/blog/components/blog-card";
import type { BlogPost } from "@/types/blog";

export function RelatedBlogPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 border-t border-slate-200/80 pt-12 sm:mt-20 sm:pt-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
            Keep reading
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
            Related articles
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-brand)] hover:underline"
        >
          View all
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
