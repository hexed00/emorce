import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-line/60 py-8 mt-auto relative z-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-muted font-mono">
          © {new Date().getFullYear()} Emorce · built for the circle
        </p>
        <div className="flex items-center gap-4 text-[12px] text-muted">
          <Link href="/key" className="hover:text-text transition-colors">
            Get Key
          </Link>
          <Link href="/hub" className="hover:text-text transition-colors">
            Scripts
          </Link>
          <a
            href="https://discord.gg/emorce"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5865F2] transition-colors"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
