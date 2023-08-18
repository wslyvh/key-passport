'use client';
import { FlaskComponent } from '@/components/flask';
import { Bar } from '@/features';
import { UploadPane } from '@/features/upload';
import { useSnaps } from '@/providers/snapsProvider';

export default function UploadPage() {
  const snaps = useSnaps();

  if (snaps.loading) return <div>&nbsp;</div>;

  // if (!snaps.hasSnaps) {
  //   return <FlaskComponent />;
  // }

  return (
    <div>
     <UploadPane />
    </div>
  );
}
