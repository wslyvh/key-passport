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
  stamp: Stamp;
}

export function Menu(props: Props) {
  const snaps = useSnaps();
  const data = JSON.parse(props.stamp.data);

  async function del() {
    await deleteStamp(props.stamp.id);
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
        <li>
          <a onClick={() => del()}>Delete</a>
        </li>
        {props.stamp.type === 'eas' && (
          <li>
            <Link
              href={`https://easscan.org/attestation/view/${data.sig.uid}`}
              target="_blank"
            >
              Explorer
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
