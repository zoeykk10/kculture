interface FooterProps {
  locale: 'ko' | 'en';
}

const navItems = [
  { icon: 'home', ko: '홈', en: 'Home' },
  { icon: 'explore', ko: '탐색', en: 'Explore' },
  { icon: 'search', ko: '검색', en: 'Search' },
  { icon: 'person', ko: '프로필', en: 'Profile' },
];

export default function Footer({ locale }: FooterProps) {
  return (
    <>
      <footer className="w-full py-10 px-6 mt-16 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="text-stone-900 font-bold tracking-widest font-headline text-xs uppercase">
            Seoul Curator
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {['About', 'Curators', 'Terms', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-stone-500 hover:text-stone-900 transition-colors font-label text-[11px] tracking-tighter uppercase"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="text-stone-400 font-label text-[10px] tracking-tighter uppercase text-center">
            © 2026 Seoul Curator. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Bottom nav — mobile only */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-[env(safe-area-inset-bottom,16px)] px-2 bg-[#fbf9f4]/95 backdrop-blur-md rounded-t-xl border-t border-stone-200/40 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] md:hidden">
        {navItems.map((item, i) => (
          <a
            key={item.icon}
            href="#"
            className={`flex flex-col items-center py-1 px-3 transition-all ${
              i === 0 ? 'text-[#b91d20]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px] mb-0.5"
              style={i === 0 ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-label text-[9px] uppercase tracking-widest font-medium">
              {locale === 'ko' ? item.ko : item.en}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
