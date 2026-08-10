import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { BlogVerticalBadge } from "@/modules/blog/components/blog-vertical-badge";
import { formatBlogDate } from "@/lib/blog-data";
import type { BlogPost } from "@/types/blog";
import { cn } from "@/utils/cn";

export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white shadow-[0_12px_40px_-24px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-brand)]/35 hover:shadow-[0_20px_50px_-22px_rgba(76,175,80,0.35)]",
        className,
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <BlogVerticalBadge vertical={post.vertical} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readMinutes} min read
          </span>
        </div>

        <Link href={`/blog/${post.slug}`} className="mt-3 block flex-1">
          <h2 className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-ink transition group-hover:text-[color:var(--color-accent)] sm:text-[1.35rem]">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </Link>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm text-muted">
            <span className="font-medium text-ink">{post.author}</span>
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-brand)] transition group-hover:gap-1.5"
          >
            Read article
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
