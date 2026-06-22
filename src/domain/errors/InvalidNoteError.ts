import { DomainError } from './DomainError';
import { ERROR_CODES } from './ErrorCode';

export class InvalidNoteError extends DomainError {
  public readonly code = ERROR_CODES.INVALID_NOTE;

  /**
   * @param token
   */
  public constructor(public readonly token: string) {
    super(`Niepoprawny dźwięk: "${token}". Oczekiwano np. C, F#, Bb.`);
  }
}
