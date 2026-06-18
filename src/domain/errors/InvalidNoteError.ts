import { DomainError } from './DomainError';

export class InvalidNoteError extends DomainError {
  public readonly code = 'INVALID_NOTE' as const;

  /** 
   * @param token 
  */
  public constructor(public readonly token: string) {
    super(`Niepoprawny dźwięk: "${token}". Oczekiwano np. C, F#, Bb.`);
  }
}
