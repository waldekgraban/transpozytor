import { DomainError } from './DomainError';
import { ERROR_CODES } from './ErrorCode';

export class EmptyScaleError extends DomainError {
  public readonly code = ERROR_CODES.EMPTY_SCALE;

  public constructor() {
    super('Gama jest pusta. Podaj co najmniej jeden dźwięk, np. "C, D, E".');
  }
}
