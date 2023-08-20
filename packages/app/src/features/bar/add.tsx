import { PlusIcon } from '@/assets/icons/plus';
import { useSnaps } from '@/providers/snapsProvider';
import { addStamp, getEntropy, getStamps } from '@/services/snaps';
import { Identity } from '@semaphore-protocol/identity';
import Link from 'next/link';

export function AddButton() {
  const snaps = useSnaps();

  async function createIdentity() {
    if (!snaps.account) return;

    console.log('Create Semaphore Identity..');
    const stamps = await getStamps();
    const semaphore = stamps.filter((stamp) => stamp.type === 'semaphore');

    const entropy = await getEntropy(
      'semaphore',
      snaps.account,
      semaphore.length,
    );
    const identity = new Identity(entropy as string);
    console.log('Identity created', identity.commitment);

    await addStamp(
      'semaphore',
      identity.commitment.toString(),
      JSON.stringify({
        commitment: identity.commitment.toString(),
        trapdoor: identity.trapdoor.toString(),
        nullifier: identity.nullifier.toString(),
      }),
    );
    snaps.refreshStamps();
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
        {snaps.account && (
          <li>
            <a onClick={() => createIdentity()}>Semaphore Identity</a>
          </li>
        )}
        <li>
          <Link href="upload">Upload</Link>
        </li>
        <li>
          <a href="#" className="stat-desc">
            SSH Keys (soon)
          </a>
        </li>
        <li>
          <a href="#" className="stat-desc">
            PGP Keys (soon)
          </a>
        </li>
      </ul>
    </div>
  );
}
