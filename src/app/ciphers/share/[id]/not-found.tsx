import { CyberButton } from '@/features/ciphers/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-6xl mb-6 font-bold text-destructive">404</span>
      <p className="text-article text-xl max-w-xl mb-4">
        Oops! We can&apos;t find this share record. It may have expired.
      </p>
      <Link href="/ciphers">
        <CyberButton>Back to Ciphers</CyberButton>
      </Link>
    </div>
  );
}
