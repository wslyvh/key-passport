import { Identity } from '@semaphore-protocol/identity';

export async function createIdentity(seed: string) {
  console.log('SEMAPHORE: createIdentity', seed);
  return new Identity(seed);
}
