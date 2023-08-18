import { Contract, providers, Wallet } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';
import SemaphoreABI from '../../../semaphore.json';

export const SEMAPHORE_ADDRESS_SEPOLIA =
  '0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131';

import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
  return NextResponse.json({ status: 'Ok', data: 'Hello World' });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (typeof process.env.INFURA_API_KEY !== 'string') {
    throw new Error('Please, define INFURA_API_KEY in your .env file');
  }

  if (typeof process.env.DEPLOYER_KEY !== 'string') {
    throw new Error('Please, define DEPLOYER_KEY in your .env file');
  }

  const ethereumNetwork = process.env.DEFAULT_NETWORK ?? 'sepolia';
  const deployerKey = process.env.DEPLOYER_KEY;
  const infuraApiKey = process.env.INFURA_API_KEY;

  const provider = new providers.InfuraProvider(ethereumNetwork, infuraApiKey);
  const signer = new Wallet(deployerKey, provider);
  const contract = new Contract(
    SEMAPHORE_ADDRESS_SEPOLIA,
    SemaphoreABI,
    signer,
  );

  const { identityCommitment } = req.body;

  try {
    const transaction = await contract.joinGroup(identityCommitment);

    await transaction.wait();

    res.status(200).end();
  } catch (error: any) {
    console.error(error);

    res.status(500).end();
  }
}
