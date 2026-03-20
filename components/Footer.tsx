interface FooterProps {
  locale: 'ko' | 'en';
}

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-400 text-center">
        {locale === 'ko'
          ? '© 2026 K-Culture. 모든 권리 보유.'
          : '© 2026 K-Culture. All rights reserved.'}
      </div>
    </footer>
  );
}
