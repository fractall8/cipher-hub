import { CyberButton } from '@/features/ciphers/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen text-center">
      <span className="text-6xl mb-6 font-bold text-red-400">404</span>
      <p className="text-article text-xl max-w-xl mb-4">
        Oops! We can't find this share record. It may have expired.
      </p>
      <Link href="/ciphers">
        <CyberButton>Back to Ciphers</CyberButton>
      </Link>
    </div>
  );
}
