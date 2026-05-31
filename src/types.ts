export interface UtilAPIOptions {
  /** API base URL. Defaults to `https://api.utilapi.com`. */
  baseUrl?: string;
}

export interface ActionOptions {
  /** Dot-notation command matching the REST path (e.g. `encode.base64` → `/encode/base64`). */
  command: string;
  /** Positional values mapped to query params in API reference order. */
  data?: ActionDataValue[];
}

export type ActionDataValue = string | number | boolean;

export interface UtilAPIResponse<T = unknown> {
  ok: boolean;
  endpoint: string;
  result?: T;
  error?: string;
  ms: number;
}

export interface CommandSpec {
  path: string;
  method: 'GET' | 'POST';
  params: readonly string[];
}
