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

export async function getPublicAttestations() {
  const offset = 0;

  const response = await fetch('https://easscan.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{
      attestations(take: ${defaultLimit} skip: ${offset} where: {
        revoked: {
          equals: false
        }
        attester: {
          equals: "0x8289432ACD5EB0214B1C2526A5EDB480Aa06A9ab",
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
  });
  const data = await response.json()
  console.log('DATA', data);
}
