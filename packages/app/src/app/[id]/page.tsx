'use client';

import { Details } from '@/features/stamps/details';
import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';
import { useEffect, useState } from 'react';

export default function DetailsPage({ params }: { params: { id: string } }) {
  const [stamp, setStamp] = useState<Stamp | undefined>();
  const snaps = useSnaps();

  useEffect(() => {
    const stamp = snaps.stamps.find((stamp) => stamp.id === params.id);
    setStamp(stamp);
  }, []);

  if (snaps.loading) return <div>&nbsp;</div>;

  if (!stamp) return <div>Unable to find stamp</div>;

  return <Details stamp={stamp} />;
}
