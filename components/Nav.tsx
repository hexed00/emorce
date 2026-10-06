'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const links = [
  { href: '/', label: 'Home' },
  { href: '/hub', label: 'Script Hub' },
  { href: '/key', label: 'Get Key' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-field border border-line flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="Emorce"
              width={32}
              height={32}
              className="object-cover"
              priority
            />
          </div>
          <span className="font-semibold tracking-tight text-[15px] group-hover:text-accent transition-colors">
            Emorce
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                  active
                    ? 'bg-field text-text border border-line'
                    : 'text-muted hover:text-text hover:bg-field/60'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
