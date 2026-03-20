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
      {/* Article header with gradient */}
      <div
        className="py-20 px-6 text-white"
        style={{ background: post.frontmatter.headerGradient }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-label uppercase tracking-[0.3em] opacity-70">
              {post.frontmatter.category}
            </span>
            <span className="text-[10px] font-label uppercase tracking-[0.3em] opacity-50">·</span>
            <span className="text-[10px] font-label uppercase tracking-[0.3em] opacity-70">
              {post.frontmatter.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold leading-[1.1] tracking-tight mb-8">
            {post.frontmatter.title}
          </h1>
          <p className="border-l-2 border-white/30 pl-5 italic opacity-70 text-lg font-light leading-relaxed">
            &ldquo;{post.frontmatter.pullQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* Language toggle */}
      <div className="bg-[#f0eee9] py-3 px-6">
        <div className="max-w-3xl mx-auto flex gap-5 font-label text-xs uppercase tracking-widest">
          {locale === 'ko' ? (
            <span className="font-semibold text-[#1b1c19]">한국어</span>
          ) : (
            <Link href={`/ko/hub/${post.frontmatter.hreflangSlug}`} className="text-[#777871] hover:text-[#1b1c19] transition-colors">
              한국어
            </Link>
          )}
          {locale === 'en' ? (
            <span className="font-semibold text-[#1b1c19]">English</span>
          ) : (
            <Link href={`/en/hub/${post.frontmatter.hreflangSlug}`} className="text-[#777871] hover:text-[#1b1c19] transition-colors">
              English
            </Link>
          )}
        </div>
      </div>

      {/* MDX body */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="prose max-w-none
          prose-headings:font-headline prose-headings:font-bold prose-headings:text-[#1b1c19] prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5
          prose-p:text-[#464742] prose-p:leading-[1.85] prose-p:font-light
          prose-ul:my-5 prose-li:my-2 prose-li:text-[#464742] prose-li:font-light
          prose-strong:text-[#1b1c19] prose-strong:font-semibold
          prose-a:text-[#b91d20] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:not-italic prose-blockquote:border-l-[3px] prose-blockquote:border-[#b91d20]/30 prose-blockquote:bg-[#f0eee9] prose-blockquote:py-5 prose-blockquote:px-6 prose-blockquote:my-8
          prose-hr:border-[#c7c7bf]/40 prose-hr:my-10
        ">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-16 pt-10 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="font-label text-xs uppercase tracking-widest text-[#777871] hover:text-[#1b1c19] transition-colors"
          >
            ← {locale === 'ko' ? '전체 글' : 'All posts'}
          </Link>
          <span className="font-label text-[10px] uppercase tracking-widest text-[#c7c7bf]">
            {post.frontmatter.publishedAt}
          </span>
        </div>
      </div>
    </article>
  );
}
