import { InvalidNoteError } from '../errors/InvalidNoteError';
import { Accidental } from './Accidental';
import { Note } from './Note';
import { PitchClass } from './PitchClass';

const NATURAL_PITCH_CLASSES: Readonly<Record<string, number>> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

const NOTE_TOKEN_PATTERN = /^([A-Ga-g])([#♯b♭]?)$/;

export const NoteFactory = {
  /**
   * Parsuje pojedynczy token (np. "C", "f#", "Bb") do `Note`.
   *
   * @throws {InvalidNoteError} gdy token nie reprezentuje poprawnego dźwięku.
   */
  fromToken(rawToken: string): Note {
    const token = rawToken.trim();
    const match = NOTE_TOKEN_PATTERN.exec(token);

    if (match === null) {
      throw new InvalidNoteError(rawToken);
    }

    const [, letter, accidentalSymbol] = match as unknown as [string, string, string];

    const naturalPitch = NATURAL_PITCH_CLASSES[letter.toUpperCase()];
    if (naturalPitch === undefined) {
      throw new InvalidNoteError(rawToken);
    }

    const preference = Accidental.fromSymbol(accidentalSymbol);
    const alteration = preference === 'sharp' ? 1 : preference === 'flat' ? -1 : 0;

    return Note.create(PitchClass.fromSemitones(naturalPitch + alteration), preference);
  },
} as const;
