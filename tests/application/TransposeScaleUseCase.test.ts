import { describe, expect, it } from 'vitest';
import { TransposeScaleUseCase } from '../../src/application/TransposeScaleUseCase';
import { isErr, isOk } from '../../src/domain';

describe('TransposeScaleUseCase (Application Service)', () => {
  const useCase = new TransposeScaleUseCase();

  it('transponuje gamę C-dur o 2 półtony w konwencji krzyżykowej', () => {
    const result = useCase.execute({
      rawNotes: 'C, D, E, F',
      semitones: 2,
      convention: 'sharp',
    });

    expect(isOk(result)).toBe(true);
    if (isOk(result)) {
      expect(result.value.outputNotes).toEqual(['D', 'E', 'F#', 'G']);
    }
  });

  it('renderuje ten sam wynik brzmieniowo, ale z bemolami w konwencji flat', () => {
    const result = useCase.execute({
      rawNotes: 'C, D, E, F',
      semitones: 2,
      convention: 'flat',
    });

    if (isOk(result)) {
      expect(result.value.outputNotes).toEqual(['D', 'E', 'Gb', 'G']);
    } else {
      throw new Error('Oczekiwano sukcesu');
    }
  });

  it('zwraca Result.err z kodem INVALID_NOTE dla błędnego dźwięku', () => {
    const result = useCase.execute({ rawNotes: 'C, H, E', semitones: 1, convention: 'sharp' });

    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error.code).toBe('INVALID_NOTE');
    }
  });

  it('zwraca Result.err z kodem EMPTY_SCALE dla pustego wejścia', () => {
    const result = useCase.execute({ rawNotes: '   ,  ', semitones: 1, convention: 'sharp' });

    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error.code).toBe('EMPTY_SCALE');
    }
  });

  it('zwraca Result.err z kodem INVALID_INTERVAL dla niecałkowitego przesunięcia', () => {
    const result = useCase.execute({ rawNotes: 'C, D', semitones: 1.5, convention: 'sharp' });

    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error.code).toBe('INVALID_INTERVAL');
    }
  });
});
