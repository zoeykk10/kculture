import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? 'K-Culture 블로그' : 'K-Culture Blog',
    description:
      locale === 'ko'
        ? '한국 음식, K-뷰티, 한국 여행 정보'
        : 'Korean food, K-beauty, and Korea travel guides',
  };
}

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  const lang = locale as 'ko' | 'en';
  const posts = getAllPosts(lang);

  const byCategory = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const cat = post.frontmatter.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">K-Culture</h1>
        <p className="text-gray-500 text-lg">
          {lang === 'ko'
            ? '한국 음식, K-뷰티, 여행 정보를 모았습니다'
            : 'Korean food, K-beauty, and travel guides'}
        </p>
      </div>

      {Object.entries(byCategory).map(([category, categoryPosts]) => (
        <section key={category} className="mb-14">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 border-b pb-3">
            {category}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {categoryPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/hub/${post.slug}`}
                className="group block border border-gray-200 rounded-xl p-5 hover:border-gray-400 transition-colors"
              >
                <div
                  className="h-1 w-10 rounded mb-4"
                  style={{ background: post.frontmatter.headerGradient }}
                />
                <h3 className="font-semibold text-gray-900 group-hover:text-black mb-2 leading-snug">
                  {post.frontmatter.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {post.frontmatter.description}
                </p>
                <div className="mt-3 text-xs text-gray-400">
                  {post.frontmatter.readTime} · {post.frontmatter.publishedAt}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
