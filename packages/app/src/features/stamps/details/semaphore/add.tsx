import { PlusIcon } from '@/assets/icons/plus';
import { useSnaps } from '@/providers/snapsProvider';
import { addStamp, getEntropy, getStamps } from '@/services/snaps';
import { Stamp } from '@/types';
import { Group } from '@semaphore-protocol/group';
import { Identity } from '@semaphore-protocol/identity';
import { generateProof } from '@semaphore-protocol/proof';
import Link from 'next/link';
import { JsxEmit } from 'typescript';

interface Props {
  stamp: Stamp;
}

export function CreateGroupButton({ stamp }: Props) {
  const snaps = useSnaps();

  async function joinGroup() {
    if (!snaps.account) return;

    console.log('Join Semaphore Group..');
    const data = JSON.parse(stamp.data);

    const res = await fetch('api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identityCommitment: data.commitment.toString(),
      }),
    });
  }

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-secondary btn-sm">
        <PlusIcon />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>Create Group (soon)</li>
        <li>Join Group (soon)</li>
      </ul>
    </div>
  );
}
