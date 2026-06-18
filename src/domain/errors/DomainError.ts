export abstract class DomainError extends Error {

  public abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const isDomainError = (value: unknown): value is DomainError =>
  value instanceof DomainError;
