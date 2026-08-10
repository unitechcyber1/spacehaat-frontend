import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { BlogVerticalBadge } from "@/modules/blog/components/blog-vertical-badge";
import { formatBlogDate } from "@/lib/blog-data";
import type { BlogPost } from "@/types/blog";

export function BlogFeaturedCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)]">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <Link
          href={`/blog/${post.slug}`}
          className="relative block min-h-[240px] overflow-hidden bg-slate-100 lg:min-h-[420px]"
        >
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            priority
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/10" />
        </Link>

        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <BlogVerticalBadge vertical={post.vertical} />
            <span className="rounded-full bg-[color:var(--color-brand-soft)] px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent)]">
              Featured
            </span>
          </div>

          <Link href={`/blog/${post.slug}`} className="mt-5 block">
            <h2 className="font-display text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.03em] text-ink transition group-hover:text-[color:var(--color-accent)] sm:text-4xl">
              {post.title}
            </h2>
          </Link>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{post.excerpt}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {post.readMinutes} min read
            </span>
            <span>{post.author}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--color-brand)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(76,175,80,0.35)] transition hover:bg-[color:var(--color-accent)]"
          >
            Read full article
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
