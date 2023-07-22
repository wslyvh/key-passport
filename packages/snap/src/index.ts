import { OnRpcRequestHandler } from '@metamask/snaps-types';

export type GetEntropyParams = {
  salt?: string;
};

export type AddStampParams = {
  stamp: string;
};

export type DeleteStampParams = {
  id: string;
};

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  console.log('SNAPS: onRpcRequest', request.method, request.params);

  switch (request.method) {
    case 'passport_getEntropy': {
      const params = request.params as GetEntropyParams;
      const salt = params?.salt ?? '';

      return snap.request({
        method: 'snap_getEntropy',
        params: {
          version: 1,
          salt,
        },
      });
    }

    case 'passport_getStamps': {
      return snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      });
    }

    case 'passport_addStamp': {
      const params = request.params as AddStampParams;
      const currentState = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      });

      const stamps = currentState?.stamps
        ? [...(currentState.stamps as string[]), params.stamp]
        : [params.stamp];

      return snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: {
            stamps,
          },
        },
      });
    }

    case 'passport_deleteStamp': {
      const params = request.params as DeleteStampParams;
      const currentState = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      });

      const stamps = (currentState?.stamps as string[]).filter((i: string) => {
        const stamp = JSON.parse(i);
        return stamp.id !== params.id;
      });

      return snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: {
            stamps,
          },
        },
      });
    }

    case 'passport_clearState': {
      return snap.request({
        method: 'snap_manageState',
        params: { operation: 'clear' },
      });
    }

    default:
      throw new Error('Method not found.');
  }
};
