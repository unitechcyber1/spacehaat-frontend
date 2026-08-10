import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getBlogPostBySlug, listBlogSlugs, listRelatedBlogPosts } from "@/lib/blog-data";
import { BlogDetailPage } from "@/modules/blog/blog-detail-page";
import { buildMetadata } from "@/utils/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return buildMetadata("Article not found", "This blog article could not be found.", `/blog/${slug}`);
  }
  return buildMetadata(post.title, post.excerpt, `/blog/${post.slug}`);
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = listRelatedBlogPosts(post);

  return <BlogDetailPage post={post} related={related} />;
}
