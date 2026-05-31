import { COMMAND_REGISTRY } from './commands.js';
import { UtilAPIError } from './errors.js';
import type { ActionOptions, UtilAPIOptions, UtilAPIResponse } from './types.js';

const DEFAULT_BASE_URL = 'https://api.utilapi.com';

export class UtilAPI {
  private readonly baseUrl: string;

  constructor(options: UtilAPIOptions = {}) {
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
  }

  async action<T = unknown>(options: ActionOptions): Promise<UtilAPIResponse<T>> {
    const spec = COMMAND_REGISTRY[options.command];
    if (!spec) {
      throw new UtilAPIError(`Unknown command: ${options.command}`);
    }

    const data = options.data ?? [];
    if (data.length > spec.params.length) {
      throw new UtilAPIError(
        `Too many data values for command "${options.command}" (expected at most ${spec.params.length})`,
      );
    }

    const url = this.buildUrl(spec.path, spec.params, data);

    try {
      const response = await fetch(url, { method: spec.method });

      if (!response.ok) {
        throw new UtilAPIError(`HTTP ${response.status}: ${response.statusText}`, {
          status: response.status,
        });
      }

      return (await response.json()) as UtilAPIResponse<T>;
    } catch (err) {
      if (err instanceof UtilAPIError) {
        throw err;
      }

      const message = err instanceof Error ? err.message : String(err);
      throw new UtilAPIError(`Network error: ${message}`, { cause: err });
    }
  }

  private buildUrl(
    path: string,
    paramNames: readonly string[],
    data: NonNullable<ActionOptions['data']>,
  ): string {
    const searchParams = new URLSearchParams();

    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      if (value === undefined || value === null) {
        continue;
      }

      const stringValue = String(value).trim();
      if (stringValue === '') {
        continue;
      }

      searchParams.set(paramNames[i], stringValue);
    }

    const query = searchParams.toString();
    return `${this.baseUrl}${path}${query ? `?${query}` : ''}`;
  }
}
