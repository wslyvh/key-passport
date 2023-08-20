import { Contract, providers, Wallet } from 'ethers';
import SemaphoreABI from '../../../contracts/semaphore.json';

export const SEMAPHORE_ADDRESS_SEPOLIA =
  '0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return NextResponse.json({ status: 200, data: [] });
}

export async function POST(req: Request) {
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
  console.log('Contract:', contract.address);

  try {
    const { groupId, action, identityCommitment } = await req.json();

    let hash = '';
    if (action === 'join') {
      const tx = await contract['addMember(uint256,uint256)'](
        groupId,
        identityCommitment,
      );

      await tx.wait();
    }
    if (action === 'leave') {
      const tx = await contract[
        'removeMember(uint256,uint256,uint256[],uint8[])'
      ](groupId, identityCommitment, [], []);

      await tx.wait();
    }

    return NextResponse.json({ status: 200, message: 'Ok', data: hash });
  } catch (error: any) {
    console.error(error);

    return new Response('Unable to join group', {
      status: 500,
    });
  }
}
