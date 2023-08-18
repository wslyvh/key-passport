import { Contract, providers, Wallet } from 'ethers';
import dotenv from 'dotenv';
import SemaphoreABI from '../contracts/semaphore.json';
import { SEMAPHORE_ADDRESS_SEPOLIA } from '@/app/api/groups';

dotenv.config();

const run = async () => {
  if (typeof process.env.INFURA_API_KEY !== 'string') {
    throw new Error('Please, define INFURA_API_KEY in your .env file');
  }

  if (typeof process.env.DEPLOYER_KEY !== 'string') {
    throw new Error('Please, define DEPLOYER_KEY in your .env file');
  }

  console.log('Create Semaphore group..');

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
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
