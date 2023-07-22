import { Stamp, StampTypes } from '@/types';
import { SNAP_VERSION, defaultSnapOrigin } from '@/utils/snaps';

export async function getEntropy(index: number = 0) {
  console.log('SNAPS: getEntropy', index);

  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'passport_getEntropy',
        params: {
          salt: `semaphore:${index}`,
        },
      },
    },
  });
}

export async function getStamps() {
  console.log('SNAPS: getStamps');

  const state: any = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'passport_getStamps',
      },
    },
  });

  if (state?.stamps) {
    return state.stamps.map((stamp: string) => JSON.parse(stamp)) as Stamp[];
  }

  return [];
}

export async function addStamp(type: StampTypes, id: string, data: string) {
  console.log('SNAPS: addStamp', type, data);

  const stamps = await getStamps();
  if (stamps.find((stamp) => stamp.type === type && stamp.id === id)) {
    console.log('SNAPS: addStamp: stamp already exists');
    return;
  }

  const stamp = {
    type,
    data,
    id,
    created: Date.now(),
    version: SNAP_VERSION,
  };

  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'passport_addStamp',
        params: { stamp: JSON.stringify(stamp) },
      },
    },
  });
}

export async function deleteStamp(id: string) {
  console.log('SNAPS: deleteStamp', id);

  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'passport_deleteStamp',
        params: { id: id },
      },
    },
  });
}

export async function clearState() {
  console.log('SNAPS: clearState');

  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'passport_clearState',
      },
    },
  });
}
