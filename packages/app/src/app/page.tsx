'use client';
import { FlaskComponent } from '@/components/flask';
import { Bar } from '@/features';
import { List } from '@/features/stamps/list';
import { useSnaps } from '@/providers/snapsProvider';

export default function Home() {
  const snaps = useSnaps();

  if (snaps.loading) return <div>&nbsp;</div>;

  // if (!snaps.hasSnaps) {
  //   return <FlaskComponent />;
  // }


  return (
    <div>
      <Bar />

      <List />
    </div>
  );
}
