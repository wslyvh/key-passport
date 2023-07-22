'use client';

import Image, { StaticImageData } from 'next/image';
import { StampTypes } from '@/types';
import { TruncateMiddle } from '@/utils/format';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Menu } from './menu';

dayjs.extend(relativeTime);

interface Props {
  id: string;
  type: StampTypes;
  image: StaticImageData;
  created: number;
  creator?: string;
  private?: boolean;
}

export function Card(props: Props) {
  return (
    <div
      key={props.id}
      className="flex w-full bg-base-100 p-4 gap-4 rounded-lg"
    >
      <div className="avatar">
        <div className="w-12 rounded-full">
          <Image src={props.image} alt={props.type} />
        </div>
      </div>

      <div className="flex-grow min-w-0">
        <h2 className="truncate text-ellipsis">{props.id}</h2>
        <div className="flex items-center gap-2 text-xs pt-1">
          <p className="shrink-0">{dayjs().to(props.created)}</p>
          {props.creator && (
            <>
              <p>·</p>
              <p className="truncate text-ellipsis">
                {TruncateMiddle(props.creator)}
              </p>
            </>
          )}
        </div>
      </div>

      <Menu
        id={props.id}
        private={props.private}
        url={
          props.type === 'eas' && !props.private
            ? `https://easscan.org/attestation/view/${props.id}`
            : ''
        }
      />
    </div>
  );
}
