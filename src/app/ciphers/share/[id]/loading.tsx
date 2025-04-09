import { Spinner } from '@/shared/ui/spinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-w-full min-h-screen">
      <Spinner className="text-primary" size="large" />
    </div>
  );
}
