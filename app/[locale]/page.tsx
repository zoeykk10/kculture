import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Seoul Curator — K-Culture',
    description:
      locale === 'ko'
        ? '한국 음식, K-뷰티, 한국 여행 정보를 에디토리얼 시선으로 큐레이션합니다'
        : 'Korean food, K-beauty, and Korea travel — curated through an editorial lens',
  };
}

const hanokVoid = {
  paddingLeft: 'clamp(2rem, 10vw, 8rem)',
  paddingRight: 'clamp(2rem, 10vw, 8rem)',
};

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
    <div>
      {/* Hero Section */}
      <section style={hanokVoid} className="py-12">
        <div className="w-full h-[618px] md:h-[663px] relative overflow-hidden bg-[#f4f4f2]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida/ADBb0ugkd4rqi3adjDGLESR1fk5c_HM3n5tUxiGIDpy0gFpQwcHXCRcEd6tnNjdUoM3Nz9kOF41VIYlofqifhmdY6RWZ0a3c9csepCOa2NPjvworFy7wufX759AgW8C8onisPp5WdB9cwOF3PhviecX1E5vuwTGxxSvCcPeZqcnR1cDkUC9fqncRtWRxVE7Nzh8GrradtJggWBhIwcyPvMGb79dUp-HmzxZENmICAW0avoJhVBYSGnSlX7WPjCx_mbzYaP5km3gDALtndw"
            alt="All About K-Vibe illustration"
            className="w-full h-full object-cover transition-opacity duration-700"
          />
        </div>
      </section>

      {/* Category Nav */}
      <section style={hanokVoid} className="pb-16 pt-4">
        <nav className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
          {Object.keys(byCategory).map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="font-['Inter'] text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-[#3f4945] hover:text-[#00342b] transition-colors duration-300"
            >
              {category}
            </a>
          ))}
        </nav>
      </section>

      {/* Editorial Mission */}
      <section style={hanokVoid} className="pb-32 flex justify-end">
        <div className="max-w-2xl text-right md:text-left md:ml-auto">
          <p className="font-['Inter'] text-[#3f4945] text-lg md:text-xl leading-relaxed tracking-tight">
            {lang === 'ko' ? (
              <>
                에디토리얼 렌즈를 통해{' '}
                <span className="text-[#00342b] font-medium">한국의 현대성</span>과 전통 유산이
                교차하는 섬세한 지점을 기록합니다. 고요한 건축적 공간, 의도적인 식문화,
                그리고 진화하는 한국의 시각적 풍경을 찾아냅니다.{' '}
                <span className="text-[#9e4039]">움직임 사이의 고요함</span>을 소중히 여기는
                문화로의 창을 열어드립니다.
              </>
            ) : (
              <>
                All About K-Vibe exists as a digital archive for the discerning eye, documenting the
                delicate intersection of{' '}
                <span className="text-[#00342b] font-medium">Korean modernity</span> and ancestral
                heritage. We seek out the quiet architectural voids, the intentional gastronomy, and
                the evolving visual landscape of the peninsula. Through meticulous curation, we offer
                a window into a culture that values the{' '}
                <span className="text-[#9e4039]">stillness between movements</span> as much as the
                progress itself.
              </>
            )}
          </p>
          <div className="mt-8 flex justify-end md:justify-start">
            <span className="font-['Inter'] text-[0.6875rem] font-medium tracking-widest uppercase text-[#9e4039]">
              {lang === 'ko' ? '2024년 설립' : 'ESTABLISHED 2024'}
            </span>
          </div>
        </div>
      </section>

      {/* Articles by category */}
      {Object.entries(byCategory).map(([category, categoryPosts]) => (
        <section
          key={category}
          id={category}
          style={hanokVoid}
          className="mb-24"
        >
          <div className="flex items-center gap-6 mb-12">
            <h2 className="font-['Inter'] text-[10px] uppercase tracking-[0.4em] text-[#707975] whitespace-nowrap">
              {category}
            </h2>
            <div className="h-px flex-grow bg-[#bfc9c4]/30" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/hub/${post.slug}`}
                className="group block bg-white p-8 transition-all duration-500 hover:scale-[1.02] shadow-[0_12px_40px_rgba(27,28,25,0.06)] hover:shadow-[0_16px_48px_rgba(27,28,25,0.10)]"
              >
                <div
                  className="h-[3px] w-8 mb-6"
                  style={{ background: post.frontmatter.headerGradient }}
                />
                <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#9e4039] mb-3 block">
                  {post.frontmatter.readTime}
                </span>
                <h3 className="font-['Epilogue'] font-bold text-[#1a1c1b] mb-3 leading-snug text-lg group-hover:text-[#00342b] transition-colors duration-300">
                  {post.frontmatter.title}
                </h3>
                <p className="font-['Inter'] text-sm text-[#3f4945] leading-relaxed line-clamp-2 font-light">
                  {post.frontmatter.description}
                </p>
                <div className="font-['Inter'] mt-6 text-[10px] uppercase tracking-widest text-[#707975]">
                  {post.frontmatter.publishedAt}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
