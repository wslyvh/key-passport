import { LockIcon } from '@/assets/icons/lock';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export function SensitivePanel(props: Props) {
  const [visible, toggleVisibility] = useState(false);
  const className = visible
    ? 'flex flex-col overflow-auto w-full h-48 border-1 border rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-400 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-900'
    : 'flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-400 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-900';

  return (
    <div className="flex items-center justify-center w-full">
      <div className={className} onClick={() => toggleVisibility(!visible)}>
        {!visible && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 dark:text-gray-400">
            <div className="mb-4">
              <LockIcon />
            </div>

            <p className="mb-2 text-sm">
              <span className="font-semibold">Reveal secret values</span>
            </p>
            <p className="text-xs text-center">
              These values should not be shared with anyone. <br />
              Make sure no one is looking at your screen.
            </p>
          </div>
        )}

        {visible && <div>{props.children}</div>}
      </div>
    </div>
  );
}
