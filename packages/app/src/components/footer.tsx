import { useSnaps } from '@/providers/snapsProvider';
import { Testing } from './testing';

export function Footer() {
  const snaps = useSnaps();

  if (process.env.NODE_ENV !== 'production' && snaps.isFlask) {
    return (
      <div className="px-8">
        <Testing />
      </div>
    );
  }

  return null;
}
