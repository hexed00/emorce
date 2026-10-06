import Link from 'next/link';
import Image from 'next/image';
import { Key, Terminal, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-field/80 text-[11px] font-mono text-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-good animate-pulse" />
            key system online
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-line bg-card glow">
              <Image src="/icon.png" alt="Emorce" width={64} height={64} className="object-cover" priority />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Emorce
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            Clean key system. Fast script delivery. Built for people who actually execute.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/key"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-text text-bg font-semibold text-sm hover:bg-white transition-colors"
            >
              <Key size={16} />
              Get Key
            </Link>
            <Link
              href="/hub"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-line bg-field text-text font-semibold text-sm hover:border-muted transition-colors"
            >
              <Terminal size={16} />
              Script Hub
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Key,
              title: 'Key System',
              desc: '12-hour keys. Claim in under a minute. Paste once, execute forever for that session.',
            },
            {
              icon: Shield,
              title: 'Secure Delivery',
              desc: 'Scripts load straight from the key server. No pastebin middlemen. No dead links.',
            },
            {
              icon: Zap,
              title: 'Fast Load',
              desc: 'One loader. One window. Enter key → hub drops. Built for executors that matter.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-line bg-card p-5 hover:border-muted/60 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-field border border-line flex items-center justify-center mb-4">
                <f.icon size={16} className="text-accent" />
              </div>
              <h3 className="font-semibold text-[15px] mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="rounded-2xl border border-line bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-line flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-bad/80" />
            <div className="w-2 h-2 rounded-full bg-amber-400/80" />
            <div className="w-2 h-2 rounded-full bg-good/80" />
            <span className="ml-2 text-[11px] font-mono text-muted">loader.lua</span>
          </div>
          <pre className="p-5 text-[13px] font-mono text-muted overflow-x-auto leading-relaxed">
{`-- Emorce Key Loader
-- Execute this in your preferred executor

loadstring(game:HttpGet("https://emorce.vercel.app/loader.lua"))()`}
          </pre>
        </div>
        <p className="mt-4 text-center text-[12px] text-faint">
          Run the loader → claim a key on this site → paste it in the window.
        </p>
      </section>
    </div>
  );
}
