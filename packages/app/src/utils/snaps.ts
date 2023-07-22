import { Snap, SnapsResponse } from '@/types/snaps';

export const SNAP_VERSION = 1;

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

export const defaultSnapOrigin =
  process.env.SNAP_ORIGIN ?? `local:http://localhost:8080`;

export const shouldDisplayReconnectButton = (installedSnap?: Snap) =>
  installedSnap && isLocalSnap(installedSnap?.id);

export async function isFlask() {
  const provider = window.ethereum;

  try {
    const clientVersion = await provider?.request({
      method: 'web3_clientVersion',
    });

    const isFlaskDetected = (clientVersion as string[])?.includes('flask');

    return Boolean(provider && isFlaskDetected);
  } catch {
    return false;
  }
}

export async function getSnaps() {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as SnapsResponse;
}

export async function connectSnap(
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) {

  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
}

export async function getSnap(version?: string) {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
}

export async function getAccounts() {
  const accounts = await window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });

  if (accounts) return accounts as string[];

  return [];
}
