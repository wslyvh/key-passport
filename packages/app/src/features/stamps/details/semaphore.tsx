'use client';

import { Code, CodePanel } from '@/components/code';
import { SensitivePanel } from '@/components/sensitive';
import { Stamp } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  stamp: Stamp;
}

export function SemaphoreDetails({ stamp }: Props) {

  return (
    <SensitivePanel>
      <Code text={JSON.stringify(JSON.parse(stamp.data), null, 4)} />
    </SensitivePanel>
  );
}
