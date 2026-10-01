import React from 'react';

export default function App(): React.JSX.Element {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0d0604] text-[#fbf5ee] p-6">
      <div className="max-w-md w-full rounded-xl p-8 bg-[#170c08] border border-[rgba(212,175,55,0.15)] shadow-2xl text-center">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-[#d4af37] bg-[rgba(212,175,55,0.1)] rounded-full border border-[rgba(212,175,55,0.25)]">
          PORTFOLIO REVAMP v2.0
        </div>
        <h1 className="text-2xl font-bold font-sans tracking-tight mb-2 text-[#fbf5ee]">
          Mithun Senthil S
        </h1>
        <p className="text-sm font-sans text-[#d8c8b8] mb-6">
          Backend &amp; Systems Engineer with Applied AI
        </p>
        <div className="flex justify-center gap-3">
          <span className="px-3 py-1.5 text-xs font-mono rounded bg-[#c0392b] text-white">
            React 19 Entry Initialized
          </span>
        </div>
      </div>
    </main>
  );
}
