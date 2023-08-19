'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { TruncateMiddle } from '@/utils/format';

export function Connect() {
  const snaps = useSnaps();

  return (
    <div className="dropdown dropdown-end">
      <button
        onClick={() => (!snaps.account ? snaps.connect() : '')}
        disabled={!snaps.isFlask}
        className="btn btn-primary btn-sm"
      >
        {snaps.account ? TruncateMiddle(snaps.account) : 'Connect'}
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => snaps.connect()}>Reconnect</a>
        </li>
      </ul>
    </div>
  );
}
