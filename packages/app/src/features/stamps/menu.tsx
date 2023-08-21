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
  data?: any;
}

export function Menu(props: Props) {
  const snaps = useSnaps();

  async function download() {
    const fileName = `${props.id}.json`;
    const file = new Blob([JSON.stringify(props.data)], { type: 'text/json' });
    const jsonURL = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute('download', fileName);
    link.click();
    document.body.removeChild(link);
  }

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
          <Link href={`/${props.id}`}>Details</Link>
        </li>
        {props.data && (
          <li>
            <a onClick={() => download()}>Download</a>
          </li>
        )}
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
