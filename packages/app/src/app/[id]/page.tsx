'use client';

import { FlaskComponent } from '@/components/flask';
import { useSnaps } from '@/providers/snapsProvider';
import { useEffect, useState } from 'react';

export default function Details() {
  const [stamp, setStamp] = useState<any | undefined>();
  const snaps = useSnaps();

  // if (!snaps.hasSnaps) {
  //   return <FlaskComponent />;
  // }

  useEffect(() => {
    const stamp = snaps.stamps.find((stamp: any) => stamp.id === '0x0c54741bd29c2fea2220bc591186572003af2a89a42296487b5809c23a664d36');
    setStamp(stamp);
  }, []);

  if (snaps.loading) return <div>&nbsp;</div>;

  return <div className="mockup-code">
    {stamp && <pre data-prefix="$"><code>{stamp.data}</code></pre> }
</div>
}
