export class UtilAPIError extends Error {
  readonly status?: number;
  readonly cause?: unknown;

  constructor(message: string, options?: { status?: number; cause?: unknown }) {
    super(message);
    this.name = 'UtilAPIError';
    this.status = options?.status;
    this.cause = options?.cause;
  }
}
