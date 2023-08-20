import { getStamps } from '@/services/snaps';
import { Stamp } from '@/types';
import { connectSnap, getSnap, isFlask } from '@/utils/snaps';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Snap } from '@/types/snaps';
import MetaMaskSDK from '@metamask/sdk';
import { getAccounts, initSdk } from '@/utils/wallets';

interface Props {
  children: ReactNode;
}

interface SnapsState {
  loading: boolean;
  isFlask: boolean;
  account: string;
  stamps: Stamp[];
  snap?: Snap;
  client?: MetaMaskSDK;
}

interface SnapStateContext extends SnapsState {
  connect: () => Promise<void>;
  refreshStamps: () => Promise<void>;
}

const defaultState: SnapStateContext = {
  loading: true,
  isFlask: false,
  account: '',
  stamps: [],
  connect: async () => {},
  refreshStamps: async () => {},
};

export const useSnaps = () => useContext(SnapsContext);

const SnapsContext = createContext(defaultState);

export function SnapsProvider(props: Props) {
  const [state, setState] = useState<SnapStateContext>({
    ...defaultState,
    connect,
    refreshStamps,
  });

  if (typeof window === 'undefined') {
    return <>{props.children}</>;
  }

  useEffect(() => {
    async function init() {
      // Check for correct MetaMask Flask client
      console.log('SnapsProvider.isFlask');
      const flask = await isFlask();
      if (!flask) {
        setState((state) => ({
          ...state,
          loading: false,
          isFlask: false,
        }));
        return;
      }

      // Get Snap installation
      console.log('SnapsProvider.getSnap');
      const snap = await getSnap();
      if (!snap || !snap.enabled) {
        console.log('Snap not found or not enabled');
        setState((state) => ({
          ...state,
          loading: false,
          isFlask: true,
        }));
        return;
      }

      // Get Accounts
      const accounts = await getAccounts();

      // Get Stamps from Snap storage
      console.log('SnapsProvider.fetchStamps');
      const stamps = await getStamps();
      setState((state) => ({
        ...state,
        loading: false,
        isFlask: true,
        stamps: stamps,
        account: accounts?.[0] ?? '',
        snap: snap,
      }));
      return;
    }

    init();
  }, []);

  useEffect(() => {
    console.log('Init wallet events..');

    const onAccountsChanged = (accounts: unknown) => {
      console.log('SnapsProvider.onAccountsChanged', accounts);
      setState((state) => ({
        ...state,
        account: (accounts as string[])?.[0] ?? undefined,
      }));
    };

    window.ethereum?.on('accountsChanged', onAccountsChanged);

    return () => {
      console.debug(`SnapsProvider.cleanup`);
      window.ethereum?.removeListener('accountsChanged', onAccountsChanged);
    };
  }, [state.client]);

  async function connect() {
    console.log('SnapsProvider.connect', state);

    try {
      await connectSnap();
      const snap = await getSnap();

      if (snap?.enabled) {
        console.log('Installed Snap. Getting accounts..');
        const sdk = await initSdk();
        const accounts = await getAccounts(sdk);

        setState((state) => ({
          ...state,
          loading: false,
          isFlask: true,
          account: accounts?.[0] ?? '',
          snap: snap,
          client: sdk,
        }));
      }
    } catch (e) {
      console.log('Unable to install or connect to Snap');
      console.error(e);
    }
  }

  async function refreshStamps() {
    console.log('SnapsProvider.refreshStamps');
    const stamps = await getStamps();

    setState((state) => ({
      ...state,
      stamps: stamps,
    }));
  }

  return (
    <SnapsContext.Provider value={state}>
      {props.children}
    </SnapsContext.Provider>
  );
}
