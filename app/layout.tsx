import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Emorce — Script Hub',
  description: 'Emorce key system & script hub. Clean. Fast. Yours.',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Emorce',
    description: 'Script hub & key system',
    images: ['/icon.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text min-h-screen flex flex-col">
        <div className="noise" aria-hidden />
        <Nav />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
