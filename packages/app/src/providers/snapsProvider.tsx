import { getStamps } from '@/services/snaps';
import { Stamp } from '@/types';
import { isFlask } from '@/utils/snaps';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Props {
  children: ReactNode;
}

interface SnapsState {
  loading: boolean;
  connected: boolean;
  hasSnaps: boolean;
  account: string;
  stamps: Stamp[];
}

interface SnapStateContext extends SnapsState {
  refreshStamps: () => Promise<void>;
  updateState: (state: SnapsState) => Promise<void>;
}

const defaultState: SnapStateContext = {
  loading: true,
  connected: false,
  hasSnaps: false,
  account: '',
  stamps: [],
  refreshStamps: async () => {},
  updateState: async (state: SnapsState) => {},
};

export const useSnaps = () => useContext(SnapsContext);

const SnapsContext = createContext(defaultState);

export function SnapsProvider(props: Props) {
  const [state, setState] = useState<SnapStateContext>({
    ...defaultState,
    refreshStamps,
    updateState,
  });

  if (typeof window === 'undefined') {
    return <>{props.children}</>;
  }

  useEffect(() => {
    async function checkFlask() {
      const flask = await isFlask();

      setState((state) => ({
        ...state,
        loading: false,
        hasSnaps: flask,
      }));
    }

    async function getPassport() {
      const stamps = await getStamps();

      setState((state) => ({
        ...state,
        loading: false,
        stamps: stamps,
      }));
    }

    checkFlask();
    getPassport();
  }, []);

  async function refreshStamps() {
    console.log('refreshStamps');
    const stamps = await getStamps();

    setState((state) => ({
      ...state,
      stamps: stamps,
    }));
  }

  async function updateState(newState: SnapsState) {
    console.log('updateState', newState);
    const stamps = await getStamps();

    setState((state) => ({
      ...state,
      ...newState,
      stamps: stamps,
    }));
  }

  return (
    <SnapsContext.Provider value={state}>
      {props.children}
    </SnapsContext.Provider>
  );
}
