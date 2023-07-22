import { ProcessIcon } from '@/assets/icons/process';
import { UploadIcon } from '@/assets/icons/upload';
import { useSnaps } from '@/providers/snapsProvider';
import { verifyAttestation } from '@/services/eas';
import { addStamp } from '@/services/snaps';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function UploadPane() {
  const snaps = useSnaps();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log('handleFileUpload');
    setLoading(true);

    if (acceptedFiles?.length > 0) {
      let reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);

      reader.onload = async function () {
        const data = JSON.parse(reader.result as string);

        // EAS Attestation
        if (data.sig && data.signer) {
          const valid = verifyAttestation(data);
          if (valid) {
            await addStamp('eas', data.sig.uid, JSON.stringify(data));
            snaps.refreshStamps();
            router.push('/');
          }
        }

        // Semaphore Identity
        if (data) {
          // const entropy = await getEntropy();
          // console.log('Entropy', entropy);
          // const identity = await createIdentity(entropy as string);
          // console.log('Identity', identity);
        }
      };
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="flex items-center justify-center w-full"
      {...getRootProps()}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-400 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-900"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="mb-4 text-gray-500 dark:text-gray-400">
            {!loading && <UploadIcon />}
            {loading && <ProcessIcon />}
          </div>

          {!loading && (
            <>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Currently supports EAS Attestations and Semaphore identities.
              </p>
            </>
          )}

          {loading && (
            <>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Loading</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Processing your file..
              </p>
            </>
          )}
        </div>
        <input id="dropzone-file" {...getInputProps()} />
      </label>
    </div>
  );
}
