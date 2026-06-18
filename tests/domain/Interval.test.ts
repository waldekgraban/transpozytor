import { describe, expect, it } from 'vitest';
import { Interval } from '../../src/domain/interval/Interval';
import { InvalidIntervalError } from '../../src/domain/errors/InvalidIntervalError';

describe('Interval (Value Object)', () => {
  it('tworzy się z liczby całkowitej i rozpoznaje kierunek', () => {
    expect(Interval.ofSemitones(5).direction).toBe('up');
    expect(Interval.ofSemitones(-3).direction).toBe('down');
    expect(Interval.ofSemitones(0).direction).toBe('unison');
  });

  it('odrzuca wartości niecałkowite błędem domenowym', () => {
    expect(() => Interval.ofSemitones(1.5)).toThrow(InvalidIntervalError);
  });

  it('zwraca interwał odwrotny bez mutacji', () => {
    const up = Interval.ofSemitones(7);
    const down = up.inverted();
    expect(down.semitones).toBe(-7);
    expect(up.semitones).toBe(7);
  });

  it('porównuje przez wartość', () => {
    expect(Interval.ofSemitones(4).equals(Interval.ofSemitones(4))).toBe(true);
    expect(Interval.ofSemitones(4).equals(Interval.ofSemitones(5))).toBe(false);
  });
});
