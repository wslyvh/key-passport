import { Contract, providers, Wallet } from 'ethers';
import dotenv from 'dotenv';
import SemaphoreABI from '../../contracts/semaphore.json';

dotenv.config();

export const SEMAPHORE_ADDRESS_SEPOLIA =
  '0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131';

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

  console.log('Network:', ethereumNetwork);
  console.log('Deployer key:', deployerKey); // NEVER SHARE PRIVATE KEYS
  console.log('Infura API key:', infuraApiKey);

  const provider = new providers.InfuraProvider(ethereumNetwork, infuraApiKey);
  const signer = new Wallet(deployerKey, provider);
  const contract = new Contract(
    SEMAPHORE_ADDRESS_SEPOLIA,
    SemaphoreABI,
    signer,
  );
  console.log('Contract:', contract.address);

  // groupId, identityCommitment
  const tx = await contract['addMember(uint256,uint256)'](
    11111,
    '14897823942312060951066598381578524751297893296856498606724634532652606087790',
  );
  await tx.wait();

  console.log('Group joined');
  console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
