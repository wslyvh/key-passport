import MetaMaskSDK from '@metamask/sdk';
import { config } from './config';

const options = {
  checkInstallationImmediately: false,
  enableDebug: true,
  dappMetadata: {
    name: config.title,
    url: window.location.host,
  },
};

export async function initSdk() {
  console.log('Init Metamask SDK', options);
  const sdk = new MetaMaskSDK(options);
  await sdk.init();

  return sdk;
}

export async function getAccounts(sdk?: MetaMaskSDK) {
  if (!sdk) sdk = await initSdk();
  const provider = sdk.getProvider();

  const accounts = await provider.request({
    method: 'eth_requestAccounts',
    params: [],
  });

  if (accounts) return accounts as string[];

  return [];
}
