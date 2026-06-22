import { describe, expect, it } from 'vitest';
import { TransposeScaleUseCase } from '../../src/application/TransposeScaleUseCase';
import { ERROR_CODES, isErr, isOk } from '../../src/domain';

describe('TransposeScaleUseCase (Application Service)', () => {
  const useCase = new TransposeScaleUseCase();

  it('transponuje gamę C-dur o 2 półtony w konwencji krzyżykowej', () => {
    const result = useCase.execute({
      rawNotes: 'C, D, E, F',
      semitones: 2,
      convention: 'sharp',
    });

    if (!isOk(result)) throw new Error('Oczekiwano sukcesu');
    expect(result.value.outputNotes).toEqual(['D', 'E', 'F#', 'G']);
  });

  it('renderuje ten sam wynik brzmieniowo, ale z bemolami w konwencji flat', () => {
    const result = useCase.execute({
      rawNotes: 'C, D, E, F',
      semitones: 2,
      convention: 'flat',
    });

    if (!isOk(result)) throw new Error('Oczekiwano sukcesu');
    expect(result.value.outputNotes).toEqual(['D', 'E', 'Gb', 'G']);
  });

  it('zwraca Result.err z kodem INVALID_NOTE dla błędnego dźwięku', () => {
    const result = useCase.execute({ rawNotes: 'C, H, E', semitones: 1, convention: 'sharp' });

    if (!isErr(result)) throw new Error('Oczekiwano błędu');
    expect(result.error.code).toBe(ERROR_CODES.INVALID_NOTE);
  });

  it('zwraca Result.err z kodem EMPTY_SCALE dla pustego wejścia', () => {
    const result = useCase.execute({ rawNotes: '   ,  ', semitones: 1, convention: 'sharp' });

    if (!isErr(result)) throw new Error('Oczekiwano błędu');
    expect(result.error.code).toBe(ERROR_CODES.EMPTY_SCALE);
  });

  it('zwraca Result.err z kodem INVALID_INTERVAL dla niecałkowitego przesunięcia', () => {
    const result = useCase.execute({ rawNotes: 'C, D', semitones: 1.5, convention: 'sharp' });

    if (!isErr(result)) throw new Error('Oczekiwano błędu');
    expect(result.error.code).toBe(ERROR_CODES.INVALID_INTERVAL);
  });
});
