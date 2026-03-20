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
      <footer className="w-full py-12 px-8 mt-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-stone-900 font-bold tracking-widest font-headline text-sm uppercase">
            Seoul Curator
          </div>
          <div className="flex gap-8">
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
          <div className="text-stone-400 font-label text-[11px] tracking-tighter uppercase">
            © 2026 Seoul Curator. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Bottom nav — mobile only */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-5 px-4 bg-[#fbf9f4]/90 backdrop-blur-md rounded-t-xl border-t border-stone-200/30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] md:hidden">
        {navItems.map((item, i) => (
          <a
            key={item.icon}
            href="#"
            className={`flex flex-col items-center transition-all ${
              i === 0 ? 'text-[#b91d20] scale-110' : 'text-stone-400 hover:text-stone-900'
            }`}
          >
            <span
              className="material-symbols-outlined mb-1"
              style={i === 0 ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest font-medium">
              {locale === 'ko' ? item.ko : item.en}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
