export type StampTypes = 'eas' | 'semaphore' | 'ssh';

export interface Passport {
  stamps: Stamp[];
}

export interface Stamp {
  type: StampTypes;
  data: string;
  id: string;
  created: number;
  version: number;
}
