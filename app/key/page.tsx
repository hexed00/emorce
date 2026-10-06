'use client';

import { useState } from 'react';
import { Key, ExternalLink, Copy, Check, Clock } from 'lucide-react';

const KEY_API = 'https://keysystem-production-9dca.up.railway.app/';

export default function KeyPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const claimUrl = KEY_API;

  const handleCopyLoader = async () => {
    const loader = `loadstring(game:HttpGet("https://emorce.vercel.app/loader.lua"))()`;
    try {
      await navigator.clipboard.writeText(loader);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-field border border-line mb-4">
          <Key size={20} className="text-accent" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Get your key</h1>
        <p className="text-muted text-sm max-w-sm mx-auto">
          Keys last <span className="text-text font-medium">12 hours</span>. Takes about 40–50 seconds.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-card overflow-hidden">
        <div className="p-5 space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-field border border-line flex items-center justify-center text-[12px] font-semibold text-muted">
              1
            </div>
            <div>
              <p className="text-sm font-medium mb-0.5">Run the loader</p>
              <p className="text-[12px] text-muted mb-2">
                Execute the Emorce loader in your preferred executor.
              </p>
              <button
                onClick={handleCopyLoader}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-field border border-line text-[12px] font-mono text-muted hover:text-text hover:border-muted transition-colors"
              >
                {copied ? <Check size={12} className="text-good" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy loader'}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-field border border-line flex items-center justify-center text-[12px] font-semibold text-muted">
              2
            </div>
            <div>
              <p className="text-sm font-medium mb-0.5">Claim a key</p>
              <p className="text-[12px] text-muted mb-2">
                Complete the short steps on the key page. You&apos;ll receive a key like{' '}
                <code className="text-accent font-mono text-[11px]">EMORCE-XXXX-XXXX-XXXX</code>
              </p>
              <a
                href={claimUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-text text-bg text-sm font-semibold hover:bg-white transition-colors"
              >
                Open key page
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-field border border-line flex items-center justify-center text-[12px] font-semibold text-muted">
              3
            </div>
            <div>
              <p className="text-sm font-medium mb-0.5">Paste &amp; load</p>
              <p className="text-[12px] text-muted">
                Paste the key into the Emorce window that appeared in-game, then hit{' '}
                <span className="text-text">Check Key</span>. The hub loads automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-line bg-field/40 flex items-center gap-2 text-[12px] text-muted">
          <Clock size={13} />
          Keys last 12 hours · one key per session
        </div>
      </div>

      <p className="mt-6 text-center text-[12px] text-faint">
        The loader already opens this flow for you. This page is here if you need it outside the game.
      </p>
    </div>
  );
}
