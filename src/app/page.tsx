import { KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="cyber-border cyber-background neon-glow grid place-items-center p-3">
          <KeyRound className="text-primary-strong h-9 w-9 sm:h-10 sm:w-10" />
        </span>
        <h1 className="text-display neon-text from-primary-strong to-primary bg-gradient-to-br bg-clip-text text-5xl text-transparent sm:text-6xl">
          Cipher Hub
        </h1>
      </div>

      <p className="text-muted-foreground max-w-2xl text-lg text-balance sm:text-xl">
        A powerful tool for encoding and decoding messages using various classical and modern cipher
        techniques.
      </p>

      <Link
        className="cyber-button px-8 py-3 text-lg font-semibold"
        href="/ciphers"
        aria-label="Open the ciphers workspace"
      >
        Let&apos;s start!
      </Link>

      <ul className="text-muted-foreground mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
        {['Caesar', 'Vigenère', 'Bacon', 'Base64', 'Base32'].map((name) => (
          <li key={name} className="cyber-border cyber-background cyber-sm px-3 py-1">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
