import { KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center space-y-6 text-center">
      <div className="flex items-center space-x-2">
        <KeyRound className="h-12 w-12 text-primary animate-pulse" />
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Cipher Hub
        </h1>
      </div>
      <p className="text-muted-foreground text-lg max-w-2xl">
        A powerful tool for encoding and decoding messages using various classical and modern cipher
        techniques.
      </p>
      <Link
        className="py-2 cyber-button px-6 text-lg bg-primary text-secondary rounded-lg hover:bg-primary/80 transition duration-300"
        href="/ciphers"
      >
        Let's start!
      </Link>
    </div>
  );
}
