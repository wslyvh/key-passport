'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { addStamp, getStamps, clearState } from '@/services/snaps';

export function Testing() {
  const snaps = useSnaps();

  async function add() {
    console.log('TEST: addStamp');

    await addStamp(
      'eas',
      '0x0c54741bd29c2fea2220bc591186572003af2a89a42296487b5809c23a664d36',
      JSON.stringify({
        sig: {
          domain: {
            name: 'EAS Attestation',
            version: '0.26',
            chainId: 1,
            verifyingContract: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
          },
          uid: '0x0c54741bd29c2fea2220bc591186572003af2a89a42296487b5809c23a664d36',
        },
        signer: '0x8289432ACD5EB0214B1C2526A5EDB480Aa06A9ab',
      }),
    );

    await addStamp(
      'semaphore',
      '21357609217466580528844706627310780492295267146518431434389992406610136475733',
      JSON.stringify({
        commitment:
          '21357609217466580528844706627310780492295267146518431434389992406610136475733',
        trapdoor:
          '6940511705741811786286352278444494090032071535187402029049377055777321456927',
        nullifier:
          '13464852353084914846483587125655601229625417953083130266630629395322655326646',
      }),
    );

    await addStamp(
      'ssh',
      'ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBGVJDV3OnABos9JRAly8NBXRh3X6tq8P8HKrS+0TGD/kB4Q+nfvGHgaQ2NE2xETccq/W41IYYH6d6S5VeW/Wevk=`',
      JSON.stringify({
        public: `ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBGVJDV3OnABos9JRAly8NBXRh3X6tq8P8HKrS+0TGD/kB4Q+nfvGHgaQ2NE2xETccq/W41IYYH6d6S5VeW/Wevk=`,
        private: `-----BEGIN EC PRIVATE KEY-----
          MHcCAQEEIFv8Z5AkPsFuE4e5TRaT1LP9d2YHEOorBiU+LQ8VQvAMoAoGCCqGSM49
          AwEHoUQDQgAEZUkNXc6cAGiz0lECXLw0FdGHdfq2rw/wcqtL7RMYP+QHhD6d+8Ye
          BpDY0TbERNxyr9bjUhhgfp3pLlV5b9Z6+Q==
          -----END EC PRIVATE KEY-----
          `,
      }),
    );

    snaps.refreshStamps();
  }

  async function get() {
    console.log('TEST: getStamps');

    const stamps = await getStamps();
    console.log('Stamps', stamps);
    snaps.refreshStamps();
  }

  async function clear() {
    console.log('TEST: clearState');

    await clearState();
    snaps.refreshStamps();
  }

  return (
    <div className="mb-8 border border-1 p-4">
      <p className="mb-2 text-xs">
        *ONLY USED FOR TESTING. <code>NODE_ENV</code> is in development mode.
      </p>
      <div className="flex w-full gap-2 justify-between">
        <button className="btn btn-xs btn-error" onClick={() => add()}>
          Add
        </button>{' '}
        <br />
        <button className="btn btn-xs btn-error" onClick={() => get()}>
          Get
        </button>{' '}
        <br />
        <button className="btn btn-xs btn-error" onClick={() => clear()}>
          Clear
        </button>
      </div>
    </div>
  );
}
