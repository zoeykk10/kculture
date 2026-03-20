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
    <div className="pb-8">
      {/* Hero */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-16 pb-14 sm:pb-20 md:pb-28 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div className="max-w-2xl">
            <span className="text-[#b91d20] font-label text-[10px] uppercase tracking-[0.3em] mb-3 sm:mb-4 block">
              Archive 01
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-headline font-bold leading-[1.1] tracking-tight text-[#1b1c19] mb-5 sm:mb-8">
              {lang === 'ko' ? (
                <>현대 서울을 위한<br /><span className="text-[#b91d20] italic">완벽한</span> 가이드.</>
              ) : (
                <>The definitive<br />guide to <span className="text-[#b91d20] italic">modern</span> Seoul.</>
              )}
            </h2>
            <p className="text-[#464742] text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-lg">
              {lang === 'ko'
                ? '에디토리얼 렌즈로 큐레이션한 한국 문화의 맥박. 강남의 네온사인 거리부터 북촌의 고요한 마당까지.'
                : 'Curating the pulse of Korean culture through an editorial lens. From the neon-lit streets of Gangnam to the serene courtyards of Bukchon.'}
            </p>
          </div>
          <div className="hidden md:block text-right shrink-0">
            <div className="text-[10px] uppercase tracking-widest text-[#777871] mb-2">Latitude / Longitude</div>
            <div className="font-label font-medium text-sm">37.5665° N, 126.9780° E</div>
          </div>
        </div>
      </section>

      {/* Categories bento grid */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-16 sm:mb-24">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h3 className="text-[10px] font-label uppercase tracking-[0.4em] text-[#777871] shrink-0">
            {lang === 'ko' ? '컬렉션' : 'The Collections'}
          </h3>
          <div className="h-px flex-grow mx-4 sm:mx-8 bg-[#c7c7bf]/30" />
          <span className="text-[10px] font-label text-[#464742] shrink-0">
            {Object.keys(byCategory).length} {lang === 'ko' ? '카테고리' : 'Categories'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#c7c7bf]/20 rounded overflow-hidden border border-[#c7c7bf]/20">
          {Object.keys(byCategory).map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="group bg-[#ffffff] flex flex-col items-center justify-center p-5 sm:p-8 transition-all duration-500 hover:bg-[#fff2f1] active:bg-[#fff2f1]"
            >
              <span className="text-[10px] sm:text-[11px] font-label uppercase tracking-widest text-[#1b1c19] group-hover:text-[#b91d20] transition-colors text-center leading-relaxed">
                {category}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Articles by category */}
      {Object.entries(byCategory).map(([category, categoryPosts]) => (
        <section key={category} id={category} className="px-4 sm:px-6 max-w-7xl mx-auto mb-16 sm:mb-24">
          <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-[#777871] whitespace-nowrap">
              {category}
            </h2>
            <div className="h-px flex-grow bg-[#c7c7bf]/30" />
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/hub/${post.slug}`}
                className="group block bg-[#ffffff] p-5 sm:p-8 transition-all duration-500 active:scale-[0.99] hover:scale-[1.02] shadow-[0_12px_40px_rgba(27,28,25,0.06)] hover:shadow-[0_16px_48px_rgba(27,28,25,0.10)]"
              >
                <div
                  className="h-[3px] w-8 mb-4 sm:mb-6"
                  style={{ background: post.frontmatter.headerGradient }}
                />
                <span className="text-[10px] font-label uppercase tracking-widest text-[#b91d20] mb-2 sm:mb-3 block">
                  {post.frontmatter.readTime}
                </span>
                <h3 className="font-headline font-bold text-[#1b1c19] mb-2 sm:mb-3 leading-snug text-base sm:text-lg group-hover:text-[#b91d20] transition-colors duration-300">
                  {post.frontmatter.title}
                </h3>
                <p className="text-sm text-[#464742] leading-relaxed line-clamp-2 font-light">
                  {post.frontmatter.description}
                </p>
                <div className="mt-4 sm:mt-6 text-[10px] font-label uppercase tracking-widest text-[#777871]">
                  {post.frontmatter.publishedAt}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#f0eee9] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-2xl sm:text-3xl font-headline font-bold mb-4 sm:mb-6 text-[#1b1c19] leading-tight">
            {lang === 'ko' ? '서울 씬의 최신 소식을\n받아보세요.' : 'Stay informed on\nthe Seoul scene.'}
          </h4>
          <p className="text-[#464742] mb-8 sm:mb-10 font-light text-sm sm:text-base">
            {lang === 'ko'
              ? '최신 한국 트렌드를 받아보는 15,000+ 독자들과 함께하세요.'
              : 'Join 15,000+ readers who receive our weekly curated dispatch on the latest Korean trends.'}
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="email@address.com"
              className="flex-grow bg-[#ffffff] border-none px-5 py-4 text-sm font-label focus:outline-none focus:ring-1 focus:ring-[#b91d20]"
            />
            <button
              type="submit"
              className="bg-[#b91d20] text-white px-8 py-4 font-label uppercase text-[11px] tracking-widest hover:bg-[#d2312f] transition-colors"
            >
              {lang === 'ko' ? '구독하기' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
