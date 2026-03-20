import Link from 'next/link';

interface HeaderProps {
  locale: 'ko' | 'en';
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-bold text-lg tracking-tight">
          K-Culture
        </Link>
        <nav className="flex gap-4 text-sm text-gray-500">
          <Link
            href="/ko"
            className={locale === 'ko' ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}
          >
            KO
          </Link>
          <Link
            href="/en"
            className={locale === 'en' ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}
          >
            EN
          </Link>
        </nav>
      </div>
    </header>
  );
}
