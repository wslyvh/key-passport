'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';
import { EllipsisIcon } from '@/assets/icons/ellipsis';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { deleteStamp } from '@/services/snaps';

dayjs.extend(relativeTime);

interface Props {
  id: string;
  private?: boolean;
  url?: string;
}

export function Menu(props: Props) {
  const snaps = useSnaps();

  async function del() {
    await deleteStamp(props.id);
    snaps.refreshStamps();
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-xs btn-ghost p-0">
        <EllipsisIcon />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Details</a>
        </li>
        {props.private && (
          <li>
            <a onClick={() => del()}>Delete</a>
          </li>
        )}
        {props.url && (
          <li>
            <Link href={props.url} target="_blank">
              Explorer
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
