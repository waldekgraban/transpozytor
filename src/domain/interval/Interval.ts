import { InvalidIntervalError } from '../errors/InvalidIntervalError';

export type IntervalDirection = 'up' | 'down' | 'unison';

export class Interval {
  private constructor(public readonly semitones: number) {}

  /**
   * Jedyny punkt wejścia (Static Factory Method). Gwarantuje, że interwał
   * powstaje wyłącznie z poprawnej liczby całkowitej.
   *
   * @throws {InvalidIntervalError}
   */
  public static ofSemitones(value: number): Interval {
    if (!Number.isInteger(value)) {
      throw new InvalidIntervalError(value);
    }
    return new Interval(value);
  }

  public get direction(): IntervalDirection {
    if (this.semitones > 0) return 'up';
    if (this.semitones < 0) return 'down';
    return 'unison';
  }

  public inverted(): Interval {
    return new Interval(-this.semitones);
  }

  public equals(other: Interval): boolean {
    return this.semitones === other.semitones;
  }

  public toString(): string {
    const sign = this.semitones > 0 ? '+' : '';
    return `${sign}${this.semitones} półton(ów)`;
  }
}
