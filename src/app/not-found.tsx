import { CyberButton } from '@/features/ciphers/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-6xl mb-6 font-bold text-destructive">404</span>
      <p className="text-article text-xl max-w-xl mb-4">
        There’s nothing here... Looks like you took a wrong turn. Let’s get back on the right track.
      </p>
      <Link href="/ciphers">
        <CyberButton>Back to Ciphers</CyberButton>
      </Link>
    </div>
  );
}
