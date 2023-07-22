'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';
import Image from 'next/image';
import easLogo from '@/assets/images/eas.png';
import semaphoreLogo from '@/assets/images/semaphore.png';
import { EllipsisIcon } from '@/assets/icons/ellipsis';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

export function Details() {
  const snaps = useSnaps();

  return (
    <div className="my-4">
      Stamp Details
    </div>
  );
}
