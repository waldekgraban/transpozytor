import type { Brand } from '../shared/Brand';

export type PitchClass = Brand<number, 'PitchClass'>;

const SEMITONES_PER_OCTAVE = 12;

export const PitchClass = {
  fromSemitones(semitones: number): PitchClass {
    const normalized =
      ((Math.trunc(semitones) % SEMITONES_PER_OCTAVE) + SEMITONES_PER_OCTAVE) %
      SEMITONES_PER_OCTAVE;
    return normalized as PitchClass;
  },

  octaveLength(): number {
    return SEMITONES_PER_OCTAVE;
  },
} as const;
