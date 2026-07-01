import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'EasyTools',
  description: 'Premium tools and software solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="nav-container">
            <Link href="/" style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
              EasyTools
            </Link>
            <div className="nav-links">
              <Link href="/programs">Programs</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
