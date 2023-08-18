'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';
import Image from 'next/image';
import easLogo from '@/assets/images/eas.png';
import semaphoreLogo from '@/assets/images/semaphore.png';
import { EllipsisIcon } from '@/assets/icons/ellipsis';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Logo } from './logo';
import { SemaphoreDetails } from './details/semaphore';
import { EasDetails } from './details/eas';
import { TruncateMiddle } from '@/utils/format';

dayjs.extend(relativeTime);

interface Props {
  stamp: Stamp;
}

export function Details({ stamp }: Props) {
  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="stat p-0 m-0">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-16 ml-4 rounded-full">
              <Logo type={stamp.type} />
            </div>
          </div>
        </div>
        <div className="stat-title">{stamp.type}</div>
        <div className="stat-value truncate text-ellipsis">
          {TruncateMiddle(stamp.id, 8)}
        </div>
        <div className="stat-desc">{dayjs().to(stamp.created)}</div>
      </div>

      <DetailsInfo stamp={stamp} />
    </div>
  );
}

export function DetailsInfo({ stamp }: Props) {
  if (stamp.type === 'eas') return <EasDetails stamp={stamp} />;
  if (stamp.type === 'semaphore') return <SemaphoreDetails stamp={stamp} />;

  return (
    <div className="mockup-code my-4">
      <pre data-prefix="$">
        <code>{stamp.data}</code>
      </pre>
    </div>
  );
}
