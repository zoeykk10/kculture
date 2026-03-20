import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost, getAllSlugs } from '@/lib/posts';
import type { Metadata } from 'next';
import Link from 'next/link';

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const ko = getAllSlugs('ko').map((slug) => ({ locale: 'ko', slug }));
  const en = getAllSlugs('en').map((slug) => ({ locale: 'en', slug }));
  return [...ko, ...en];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale as 'ko' | 'en', slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const post = getPost(locale as 'ko' | 'en', slug);

  if (!post) notFound();

  return (
    <article>
      {/* Header with gradient */}
      <div
        className="py-16 px-4 text-white"
        style={{ background: post.frontmatter.headerGradient }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-sm mb-4 opacity-70">
            {post.frontmatter.category} · {post.frontmatter.readTime}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            {post.frontmatter.title}
          </h1>
          <p className="border-l-2 border-white/40 pl-4 italic opacity-75 text-lg">
            &ldquo;{post.frontmatter.pullQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* Language toggle */}
      <div className="bg-gray-50 border-b py-2 px-4">
        <div className="max-w-2xl mx-auto flex gap-4 text-sm">
          {locale === 'ko' ? (
            <span className="font-semibold text-gray-900">한국어</span>
          ) : (
            <Link href={`/ko/hub/${post.frontmatter.hreflangSlug}`} className="text-gray-400 hover:text-gray-700">
              한국어
            </Link>
          )}
          {locale === 'en' ? (
            <span className="font-semibold text-gray-900">English</span>
          ) : (
            <Link href={`/en/hub/${post.frontmatter.hreflangSlug}`} className="text-gray-400 hover:text-gray-700">
              English
            </Link>
          )}
        </div>
      </div>

      {/* MDX Content */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="prose prose-gray prose-lg max-w-none
          prose-headings:font-semibold
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-p:leading-relaxed prose-p:text-gray-700
          prose-ul:my-4 prose-li:my-1
          prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-5 prose-blockquote:rounded-r-lg
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-hr:my-8
          prose-strong:text-gray-900
        ">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <Link href={`/${locale}`} className="text-sm text-gray-400 hover:text-gray-700">
            {locale === 'ko' ? '← 전체 글 보기' : '← All posts'}
          </Link>
        </div>
      </div>
    </article>
  );
}
