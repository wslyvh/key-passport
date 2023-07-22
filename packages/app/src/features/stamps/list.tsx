'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';
import easLogo from '@/assets/images/eas.png';
import semaphoreLogo from '@/assets/images/semaphore.png';
import sshLogo from '@/assets/images/ssh.png';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { getPublicAttestations } from '@/services/eas';
import { Card } from './card';

dayjs.extend(relativeTime);

export function List() {
  const snaps = useSnaps();
  const [tab, setTab] = useState('private');
  const [attestations, setAttetations] = useState<any[]>([]);

  useEffect(() => {
    async function getAttestations() {
      const atts = await getPublicAttestations(snaps.account);
      setAttetations(atts);
    }

    getAttestations();
  }, [snaps.account]);

  return (
    <div className="my-4">
      <div className="tabs tabs-boxed flex my-4">
        <a
          className={`tab flex-auto ${tab === 'private' ? 'tab-active' : ''}`}
          onClick={() => setTab('private')}
        >
          Private
        </a>
        <a
          className={`tab flex-auto ${tab === 'public' ? 'tab-active' : ''}`}
          onClick={() => setTab('public')}
        >
          Public
        </a>
      </div>

      {snaps.stamps && tab === 'private' && (
        <div className="flex flex-col gap-4">
          {snaps.stamps.map((i: Stamp) => {
            const data = JSON.parse(i.data) as any;

            const id = i.id;
            let image, creator;
            if (i.type === 'eas') {
              image = easLogo;
              creator = data.signer;
            }
            if (i.type === 'semaphore') {
              image = semaphoreLogo;
            }
            if (i.type === 'ssh') {
              image = sshLogo;
            }

            if (!id || !image) return null;

            return (
              <Card
                key={id}
                id={i.id}
                type={i.type}
                image={image}
                created={i.created}
                creator={creator}
                private
              />
            );
          })}
        </div>
      )}

      {tab === 'public' && (
        <div className="flex flex-col gap-4">
          {attestations.map((i: any) => {
            return (
              <Card
                key={i.id}
                id={i.id}
                type="eas"
                image={easLogo}
                created={i.timeCreated * 1000}
                creator={i.attester}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
