import { SemaphoreSubgraph } from '@semaphore-protocol/data';
import { Identity } from '@semaphore-protocol/identity';

export async function createIdentity(seed: string) {
  console.log('Semaphore.createIdentity', seed);
  return new Identity(seed);
}

export async function getGroups(identityCommitment?: string) {
  console.log('Semaphore.getGroups', identityCommitment)
  const client = new SemaphoreSubgraph();
  const groups = await client.getGroups({
    members: true,
    verifiedProofs: true,
  });

  if (identityCommitment) {
    return groups.filter((i) => i.members?.includes(identityCommitment));
  }

  return groups
}
