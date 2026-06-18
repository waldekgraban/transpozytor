import { DomainError } from './DomainError';

export class EmptyScaleError extends DomainError {
  public readonly code = 'EMPTY_SCALE' as const;

  public constructor() {
    super('Gama jest pusta. Podaj co najmniej jeden dźwięk, np. "C, D, E".');
  }
}
