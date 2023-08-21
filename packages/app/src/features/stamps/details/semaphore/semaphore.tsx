'use client';

import { Code } from '@/components/code';
import { SensitivePanel } from '@/components/sensitive';
import { Stamp } from '@/types';
import { GroupResponse, SemaphoreSubgraph } from '@semaphore-protocol/data';
import { Group } from '@semaphore-protocol/group';
import { Identity } from '@semaphore-protocol/identity';
import { generateProof } from '@semaphore-protocol/proof';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { CreateGroupButton } from './add';
import Link from 'next/link';
import { EllipsisIcon } from '@/assets/icons/ellipsis';
import { useSnaps } from '@/providers/snapsProvider';
import { getGroups } from '@/services/semaphore';

dayjs.extend(relativeTime);

interface Props {
  stamp: Stamp;
}

export function SemaphoreDetails({ stamp }: Props) {
  const snaps = useSnaps();
  const identity = JSON.parse(stamp.data);
  const [groups, setGroups] = useState<GroupResponse[]>([]);

  useEffect(() => {
    async function initGroups() {
      const groups = await getGroups(stamp.id);
      setGroups(groups);
    }

    initGroups();
  }, []);

  async function createProof(group: GroupResponse) {
    if (!snaps.account) return;

    console.log('Create Semaphore Proof..', group.id);
    const data = JSON.parse(stamp.data);

    const identity = new Identity(
      JSON.stringify([
        `0x${BigInt(data.trapdoor).toString(16)}`,
        `0x${BigInt(data.nullifier).toString(16)}`,
      ]),
    );

    const proofGroup = new Group(group.id, 20, [data.commitment]);
    const proof = await generateProof(identity, proofGroup, 1, 1);

    const fileName = `${proof.merkleTreeRoot}_${proof.signal}.json`;
    const file = new Blob([JSON.stringify(proof)], { type: 'text/json' });
    const jsonURL = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute('download', fileName);
    link.click();
    document.body.removeChild(link);
  }

  async function leaveGroup(groupId: string) {
    if (!snaps.account) return;

    const data = JSON.parse(stamp.data);
    await manageGroup('leave', groupId, data.commitment.toString());
    await onRefresh();
  }

  async function onRefresh() {
    console.log('Refreshing Groups list..');
    const client = new SemaphoreSubgraph();
    const groups = await client.getGroups({
      members: true,
      verifiedProofs: true,
    });

    const myGroups = groups.filter((i) => i.members?.includes(stamp.id));
    setGroups(myGroups);
  }

  return (
    <>
      <SensitivePanel>
        <Code text={JSON.stringify(identity, null, 4)} />
      </SensitivePanel>

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-200">Groups</h3>
          <CreateGroupButton stamp={stamp} onRefresh={onRefresh} />
        </div>

        <div className="mt-4">
          {groups.length === 0 && (
            <p className="text-sm text-center text-gray-400">
              Not a member of any groups..
            </p>
          )}
          {groups.length > 0 &&
            groups.map((group) => {
              return (
                <div
                  key={group.id}
                  className="flex w-full bg-base-100 p-4 gap-4 mb-4 rounded-lg"
                >
                  <div className="flex-grow min-w-0">
                    <h2 className="truncate text-ellipsis">
                      <strong>ID: </strong>
                      {group.id}
                    </h2>
                    <div className="flex items-center gap-2 text-xs pt-1">
                      {group.members && (
                        <p className="shrink-0">
                          {group.members.length} member(s)
                        </p>
                      )}
                      {group.admin && (
                        <>
                          <p>·</p>
                          <p className="truncate text-ellipsis">
                            {group.admin}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-xs btn-ghost p-0">
                      <EllipsisIcon />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a onClick={() => createProof(group)}>Generate Proof</a>
                      </li>
                      <li>
                        <a onClick={() => leaveGroup(group.id)}>Leave group</a>
                      </li>
                      <li>
                        <Link
                          href="https://explorer.semaphore.appliedzkp.org/"
                          target="_blank"
                        >
                          Explorer
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export async function manageGroup(
  action: 'join' | 'leave',
  groupId: string,
  identityCommitment: string,
) {
  console.log('Managing Semaphore group', action, groupId, identityCommitment);

  const res = await fetch('api/groups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action,
      groupId,
      identityCommitment,
    }),
  });

  const body = await res.json();
  console.log('Group joined', body);
  return body;
}
