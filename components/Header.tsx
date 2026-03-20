import Link from 'next/link';

interface HeaderProps {
  locale: 'ko' | 'en';
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-[#fbf9f4]/80 backdrop-blur-lg z-50 shadow-[0_8px_30px_rgb(27,28,25,0.04)]">
      <div className="flex items-center gap-4">
        <button className="text-[#1b1c19] hover:opacity-60 transition-opacity" aria-label="menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <Link
          href={`/${locale}`}
          className="text-xl font-extrabold tracking-[0.2em] text-[#1b1c19] uppercase font-headline"
        >
          SEOUL CURATOR
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <button className="text-[#1b1c19] hover:opacity-60 transition-opacity" aria-label="search">
          <span className="material-symbols-outlined">search</span>
        </button>
        <div className="flex gap-3 font-label text-xs tracking-widest uppercase">
          <Link
            href="/ko"
            className={locale === 'ko' ? 'text-[#1b1c19] font-semibold' : 'text-[#777871] hover:text-[#1b1c19] transition-colors'}
          >
            KO
          </Link>
          <Link
            href="/en"
            className={locale === 'en' ? 'text-[#1b1c19] font-semibold' : 'text-[#777871] hover:text-[#1b1c19] transition-colors'}
          >
            EN
          </Link>
        </div>
      </div>
    </header>
  );
}
