import { InfoIcon } from '@/assets/icons/info';
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
  const [error, setError] = useState('');
  const [recipient, setRecipient] = useState<string>('');
  const [file, setFile] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log('handleFileUpload');
    setError('');
    setLoading(true);

    if (acceptedFiles?.length > 0) {
      let reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);

      reader.onload = async function () {
        setFile(reader.result as string);
        const data = JSON.parse(reader.result as string);

        // EAS Attestation
        if (data.sig && data.signer) {
          const valid = verifyAttestation(data);
          if (valid) {
            if (
              snaps.account &&
              snaps.account !== data?.sig.message?.recipient
            ) {
              setError(
                'You are not the recipient of this attestation. Do you still want to add it?',
              );
              setRecipient(data?.sig.message?.recipient);
              return;
            }

            await addStamp('eas', data.sig.uid, JSON.stringify(data));
            snaps.refreshStamps();
            router.push('/');
          }
        }

        setError('Unable to verify EAS Attestation.');
      };
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  async function confirmStamp() {
    console.log('confirmStamp', file);

    const data = JSON.parse(file);
    await addStamp('eas', data.sig.uid, JSON.stringify(data));
    snaps.refreshStamps();
    router.push('/');
  }

  return (
    <>
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
              {error && <InfoIcon />}
              {!error && !loading && <UploadIcon />}
              {!error && loading && <ProcessIcon />}
            </div>

            {error && (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    {recipient && 'Warning'}
                    {!recipient && 'Error'}
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {error}
                </p>
              </>
            )}

            {!error && !loading && (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  *Currently only supports EAS Attestations.
                </p>
              </>
            )}

            {!error && loading && (
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
          <input disabled id="dropzone-file" {...getInputProps()} />
        </label>
      </div>

      <div>
        <button
          className="btn btn-sm w-full btn-primary mt-4"
          onClick={() => confirmStamp()}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
