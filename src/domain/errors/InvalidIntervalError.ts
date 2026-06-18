import { DomainError } from './DomainError';

export class InvalidIntervalError extends DomainError {
  public readonly code = 'INVALID_INTERVAL' as const;

  public constructor(public readonly received: number) {
    super(`Niepoprawny interwał: ${received}. Oczekiwano liczby całkowitej półtonów.`);
  }
}
