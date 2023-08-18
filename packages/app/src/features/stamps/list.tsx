'use client';

import { useSnaps } from '@/providers/snapsProvider';
import { Stamp } from '@/types';
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
            if (!i.id) return null;

            const data = JSON.parse(i.data) as any;

            return (
              <Card
                key={i.id}
                id={i.id}
                type={i.type}
                created={i.created}
                creator={data.signer} // only if i.type === eas
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
