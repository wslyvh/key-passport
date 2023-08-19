'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { FlaskComponent } from './flask';
import { ReactNode } from 'react';
import { LoadingIcon } from '@/assets/icons/loading';

interface Props {
  children: ReactNode;
}

export function PageWrapper(props: Props) {
  const snaps = useSnaps();

  if (snaps.loading) {
    return (
      <div className="flex justify-center text-gray-400">
        <LoadingIcon />
      </div>
    );
  }

  if (!snaps.loading && !snaps.isFlask) {
    return <FlaskComponent />;
  }

  return props.children;
}
