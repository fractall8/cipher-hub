import { Spinner } from '@/shared/ui/spinner';

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-16">
      <Spinner className="text-primary-strong" size="large" />
    </div>
  );
}
