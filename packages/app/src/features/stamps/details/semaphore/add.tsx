import { PlusIcon } from '@/assets/icons/plus';
import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';

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
        <li>
          <a href="#" className="stat-desc">Create Group (soon)</a>
        </li>
        <li>
          <a href="#" className="stat-desc">Join Group (soon)</a>
        </li>
      </ul>
    </div>
  );
}
