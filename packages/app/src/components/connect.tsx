'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { config } from '@/utils/config';
import { TruncateMiddle } from '@/utils/format';
import { connectSnap, getAccounts, getSnap, isFlask } from '@/utils/snaps';
import Link from 'next/link';

export function Connect() {
  const snaps = useSnaps();

  async function connect() {
    const hasSnaps = await isFlask();
    if (hasSnaps) {
      console.log('Connecting to Metamask..', hasSnaps);

      try {
        await connectSnap();
        const installed: any = await getSnap();

        if (installed?.enabled) {
          console.log('Snap installed. Get account..');
          const accounts = await getAccounts();
          console.log('ACCOUNTS', accounts);

          const state = {
            loading: false,
            connected: !!installed,
            hasSnaps: hasSnaps,
            account: accounts[0],
            stamps: snaps.stamps,
          };

          snaps.updateState(state);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  if (snaps.loading) return null;

  return (
    <div className="dropdown dropdown-end">
      <button
        onClick={() => (!snaps.account ? connect() : '')}
        disabled={!snaps.hasSnaps}
        className="btn btn-primary btn-sm"
      >
        {snaps.connected ? TruncateMiddle(snaps.account) : 'Connect'}
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => connect()}>Reconnect</a>
        </li>
      </ul>
    </div>
  );
}
