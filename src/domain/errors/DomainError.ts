import type { ErrorCode } from './ErrorCode';

export abstract class DomainError extends Error {
  public abstract readonly code: ErrorCode;

  protected constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const isDomainError = (value: unknown): value is DomainError => value instanceof DomainError;
