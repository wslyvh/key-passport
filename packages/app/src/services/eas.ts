import {
  OFFCHAIN_ATTESTATION_VERSION,
  Offchain,
  PartialTypedDataConfig,
} from '@ethereum-attestation-service/eas-sdk';

export const defaultLimit = 100;

export function verifyAttestation(data: any) {
  console.log('EAS: verifyAttestation', data);

  try {
    const EAS_CONFIG: PartialTypedDataConfig = {
      address: data.sig.domain.verifyingContract,
      version: data.sig.domain.version,
      chainId: data.sig.domain.chainId,
    };
    const offchain = new Offchain(EAS_CONFIG, OFFCHAIN_ATTESTATION_VERSION);
    const valid = offchain.verifyOffchainAttestationSignature(
      data.signer,
      data.sig,
    );

    return valid;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getPublicAttestations(recipient: string) {
  const offset = 0;

  const response = await fetch('https://easscan.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
        attestations(take: ${defaultLimit} skip: ${offset} where: {
          revoked: {
            equals: false
          }
          recipient: {
            equals: "${recipient}",
            mode: insensitive
          }
          OR: [
            {
              expirationTime: {
                gt: ${Math.floor(Date.now() / 1000)}
              }
            }
            {
              expirationTime: {
                equals: 0
              }
            }
          ]
          }) {
          id
          attester
          recipient
          revoked
          data
          decodedDataJson
          time
          timeCreated
          schema {
            id
            schema
          }
        }
      }`,
    }),
  });

  const data = await response.json();
  return data.data.attestations;
}
