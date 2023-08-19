export type SnapsResponse = Record<string, Snap>;

export interface Snap {
  id: string;
  version: string;
  blocked: boolean;
  enabled: boolean;
  initialPermissions: Record<string, unknown>;
}
