import { DomainError } from './DomainError';
import { ERROR_CODES } from './ErrorCode';

export class InvalidIntervalError extends DomainError {
  public readonly code = ERROR_CODES.INVALID_INTERVAL;

  public constructor(public readonly received: number) {
    super(`Niepoprawny interwał: ${received}. Oczekiwano liczby całkowitej półtonów.`);
  }
}
