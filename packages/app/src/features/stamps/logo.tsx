'use client';

import { StampTypes } from '@/types';
import Image from 'next/image';
import easLogo from '@/assets/images/eas.png';
import semaphoreLogo from '@/assets/images/semaphore.png';
import sshLogo from '@/assets/images/ssh.png';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  type: StampTypes;
}

export function Logo(props: Props) {
  if (props.type === 'eas') {
    return <Image src={easLogo} alt={props.type} />;
  }
  if (props.type === 'semaphore') {
    return <Image src={semaphoreLogo} alt={props.type} />;
  }
  if (props.type === 'ssh') {
    return <Image src={sshLogo} alt={props.type} />;
  }

  return null;
}
