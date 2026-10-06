import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-line bg-card">
          <Image src="/icon.png" alt="Emorce" width={56} height={56} className="object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">About Emorce</h1>
          <p className="text-muted text-sm">script hub · key system · circle</p>
        </div>
      </div>

      <div className="space-y-6 text-[14px] text-muted leading-relaxed">
        <p>
          Emorce is a private-style script hub with a clean key system. One loader, one window,
          keys that last twelve hours. No clutter. No fake “premium” screens.
        </p>
        <p>
          The key server lives on Railway. This site is the front door — home, script list,
          and the page your loader opens when you need a key.
        </p>
        <p>
          Built for people who actually run scripts. If you&apos;re here, you already know what
          to do.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-line">
        <p className="text-[12px] font-mono text-faint">
          emorce · not affiliated with Roblox Corporation
        </p>
      </div>
    </div>
  );
}
