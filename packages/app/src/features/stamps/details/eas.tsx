'use client';

import { Code, CodePanel } from '@/components/code';
import { Stamp } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  stamp: Stamp;
}

export function EasDetails({ stamp }: Props) {
  return (
    <div>
      <CodePanel>
        <Code text={JSON.stringify(JSON.parse(stamp.data), null, 4)} />
      </CodePanel>
    </div>
  );
}
