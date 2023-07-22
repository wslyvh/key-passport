'use client';

import Image from 'next/image';
import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';
import { EllipsisIcon } from '@/assets/icons/ellipsis';
import { TruncateMiddle } from '@/utils/format';
import easLogo from '@/assets/images/eas.png';
import semaphoreLogo from '@/assets/images/semaphore.png';
import sshLogo from '@/assets/images/ssh.png';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Menu } from './menu';

dayjs.extend(relativeTime);

export function List() {
  const snaps = useSnaps();

  return (
    <div className="my-4">
      {snaps.stamps && (
        <div className="flex flex-col gap-4">
          {snaps.stamps.map((i: Stamp) => {
            const data = JSON.parse(i.data) as any;

            const id = i.id;
            let image, creator;
            if (i.type === 'eas') {
              image = easLogo;
              creator = data.signer;
            }
            if (i.type === 'semaphore') {
              image = semaphoreLogo;
            }
            if (i.type === 'ssh') {
              image = sshLogo;
            }

            if (!id || !image) return null;

            return (
              <div
                key={id}
                className="flex w-full bg-base-100 p-4 gap-4 rounded-lg"
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <Image src={image} alt={i.type} />
                  </div>
                </div>

                <div className="flex-grow min-w-0">
                  <h2 className="truncate text-ellipsis">{id}</h2>
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <p className="shrink-0">{dayjs().to(i.created)}</p>
                    {creator && (
                      <>
                        <p>·</p>
                        <p className="truncate text-ellipsis">
                          {TruncateMiddle(creator)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <Menu stamp={i} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
