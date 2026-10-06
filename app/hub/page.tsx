import { Terminal, Copy } from 'lucide-react';
import Link from 'next/link';

const LOADER = `loadstring(game:HttpGet("https://emorce.vercel.app/loader.lua"))()`;

const scripts = [
  {
    name: 'Emorce Hub',
    tag: 'main',
    desc: 'Primary Emorce script hub. Key-gated. Loads after you enter a valid key.',
    loader: LOADER,
  },
  {
    name: 'Emorce Key Loader',
    tag: 'loader',
    desc: 'Standalone key window. Use this if you only need the key system.',
    loader: LOADER,
  },
];

export default function HubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono text-muted mb-3">
          <Terminal size={12} />
          script hub
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Scripts</h1>
        <p className="text-muted text-sm max-w-md">
          Everything routes through the key system. Run the loader, claim a key, paste it in.
        </p>
      </div>

      <div className="space-y-4">
        {scripts.map((s) => (
          <div
            key={s.name}
            className="rounded-2xl border border-line bg-card overflow-hidden"
          >
            <div className="px-5 py-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-[15px]">{s.name}</h2>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide bg-field border border-line text-muted">
                    {s.tag}
                  </span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">{s.desc}</p>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-line bg-field/30">
              <pre className="text-[12px] font-mono text-muted overflow-x-auto whitespace-pre-wrap break-all">
                {s.loader}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-card p-5">
        <h3 className="font-semibold text-sm mb-2">How it works</h3>
        <ol className="text-[13px] text-muted space-y-2 list-decimal list-inside leading-relaxed">
          <li>Execute the loader above in any supported executor.</li>
          <li>
            If you don&apos;t have a saved key, the Emorce key window opens.
          </li>
          <li>
            Click <span className="text-text">Get Key</span>, finish the steps, paste the key, hit{' '}
            <span className="text-text">Check Key</span>.
          </li>
          <li>The hub source is delivered from the key server and runs automatically.</li>
        </ol>
        <Link
          href="/key"
          className="inline-flex mt-4 text-[13px] text-accent hover:underline"
        >
          Go to Get Key →
        </Link>
      </div>
    </div>
  );
}
