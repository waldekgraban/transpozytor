import { Interval } from '../interval/Interval';
import type { AccidentalPreference } from './Accidental';
import { PitchClass } from './PitchClass';

export class Note {
  private constructor(
    public readonly pitchClass: PitchClass,
    public readonly preference: AccidentalPreference,
  ) {}

  public static create(pitchClass: PitchClass, preference: AccidentalPreference): Note {
    return new Note(pitchClass, preference);
  }

  public transpose(interval: Interval): Note {
    return new Note(
      PitchClass.fromSemitones(this.pitchClass + interval.semitones),
      this.preference,
    );
  }

  public isEnharmonicWith(other: Note): boolean {
    return this.pitchClass === other.pitchClass;
  }

  public equals(other: Note): boolean {
    return this.pitchClass === other.pitchClass && this.preference === other.preference;
  }
}
