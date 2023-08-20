import { PlusIcon } from '@/assets/icons/plus';
import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';
import { manageGroup } from './semaphore';

interface Props {
  stamp: Stamp;
  onRefresh?: () => void;
}

export function CreateGroupButton(props: Props) {
  const snaps = useSnaps();

  async function joinGroup() {
    if (!snaps.account) return;

    const data = JSON.parse(props.stamp.data);
    await manageGroup('join', '1337', data.commitment.toString());

    if (props.onRefresh) {
      props.onRefresh();
    }
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
          <a href="#" onClick={() => joinGroup()}>
            Join Group
          </a>
        </li>
        <li>
          <a href="#" className="stat-desc">
            Create Group (soon)
          </a>
        </li>
      </ul>
    </div>
  );
}
