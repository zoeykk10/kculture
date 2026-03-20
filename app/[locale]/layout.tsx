import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound();
  }

  return (
    <>
      <Header locale={locale as 'ko' | 'en'} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale as 'ko' | 'en'} />
    </>
  );
}
