"use client";

import { useMemo, useState } from "react";

import { BlogCard } from "@/modules/blog/components/blog-card";
import { BlogFeaturedCard } from "@/modules/blog/components/blog-featured-card";
import { BlogFilterTabs } from "@/modules/blog/components/blog-filter-tabs";
import type { BlogPost, BlogVerticalFilter } from "@/types/blog";

export function BlogListingExperience({
  posts,
  featured,
}: {
  posts: BlogPost[];
  featured: BlogPost | null;
}) {
  const [filter, setFilter] = useState<BlogVerticalFilter>("all");

  const filteredPosts = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((post) => post.vertical === filter);
  }, [filter, posts]);

  const gridPosts = useMemo(() => {
    if (filter === "all" && featured) {
      return filteredPosts.filter((post) => post.slug !== featured.slug);
    }
    return filteredPosts;
  }, [featured, filter, filteredPosts]);

  return (
    <>
      <div className="mt-8 sm:mt-10">
        <BlogFilterTabs active={filter} onChange={setFilter} />
      </div>

      {filter === "all" && featured ? (
        <div className="mt-8 sm:mt-10">
          <BlogFeaturedCard post={featured} />
        </div>
      ) : null}

      {gridPosts.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3">
          {gridPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-muted">
          No articles in this category yet. Check back soon.
        </p>
      )}
    </>
  );
}
