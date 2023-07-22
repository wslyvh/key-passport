import { PlusIcon } from '@/assets/icons/plus';
import Link from 'next/link';

export function AddButton() {
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
          <Link href="upload">Upload</Link>
        </li>
      </ul>
    </div>
  );
}
