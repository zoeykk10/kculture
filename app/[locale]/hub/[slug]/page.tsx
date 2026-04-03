import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost, getAllSlugs } from '@/lib/posts';
import type { Metadata } from 'next';
import Link from 'next/link';

function RelatedPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose mt-10 pt-8 border-t border-[#c7c7bf]/40 space-y-3">
      {children}
    </div>
  );
}

function PanelItem({
  label,
  slug,
  lang,
  children,
}: {
  type?: string;
  label: string;
  slug: string;
  lang: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="shrink-0 font-label text-[10px] uppercase tracking-widest text-[#777871]">
        {label}
      </span>
      <Link
        href={`/${lang}/hub/${slug}`}
        className="text-[#b91d20] text-sm font-light hover:underline"
      >
        {children}
      </Link>
    </div>
  );
}

const mdxComponents = { RelatedPanel, PanelItem };

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
      {/* Article header */}
      <div
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white"
        style={{ background: post.frontmatter.headerGradient }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
            <span className="text-[10px] font-label uppercase tracking-[0.3em] opacity-70">
              {post.frontmatter.category}
            </span>
            <span className="text-[10px] opacity-40">·</span>
            <span className="text-[10px] font-label uppercase tracking-[0.3em] opacity-70">
              {post.frontmatter.readTime}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold leading-[1.15] tracking-tight mb-6 sm:mb-8">
            {post.frontmatter.title}
          </h1>
          <p className="border-l-2 border-white/30 pl-4 sm:pl-5 italic opacity-70 text-base sm:text-lg font-light leading-relaxed">
            &ldquo;{post.frontmatter.pullQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* Language toggle */}
      <div className="bg-[#f0eee9] py-3 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex gap-4 sm:gap-5 font-label text-[10px] sm:text-xs uppercase tracking-widest">
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14">
        <div className="prose max-w-none
          prose-headings:font-headline prose-headings:font-bold prose-headings:text-[#1b1c19] prose-headings:tracking-tight
          prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-10 sm:prose-h2:mt-14 prose-h2:mb-4 sm:prose-h2:mb-5
          prose-p:text-[#464742] prose-p:leading-[1.85] prose-p:font-light prose-p:text-[15px] sm:prose-p:text-base
          prose-ul:my-4 sm:prose-ul:my-5 prose-li:my-1.5 prose-li:text-[#464742] prose-li:font-light prose-li:text-[15px]
          prose-strong:text-[#1b1c19] prose-strong:font-semibold
          prose-a:text-[#b91d20] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:not-italic prose-blockquote:border-l-[3px] prose-blockquote:border-[#b91d20]/30 prose-blockquote:bg-[#f0eee9] prose-blockquote:py-4 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:my-6 sm:prose-blockquote:my-8
          prose-hr:border-[#c7c7bf]/40 prose-hr:my-8 sm:prose-hr:my-10
        ">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 flex items-center justify-between border-t border-[#c7c7bf]/30">
          <Link
            href={`/${locale}`}
            className="font-label text-[10px] sm:text-xs uppercase tracking-widest text-[#777871] hover:text-[#1b1c19] transition-colors"
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
