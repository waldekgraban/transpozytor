import { EmptyScaleError } from '../errors/EmptyScaleError';
import type { Note } from './Note';
import { NoteFactory } from './NoteFactory';

export const ScaleParser = {
  /**
   * @throws {EmptyScaleError} gdy wejście nie zawiera żadnego dźwięku.
   * @throws {InvalidNoteError} gdy którykolwiek token jest niepoprawny.
   */
  parse(rawScale: string): readonly Note[] {
    const tokens = rawScale
      .split(',')
      .map((token) => token.trim())
      .filter((token) => token.length > 0);

    if (tokens.length === 0) {
      throw new EmptyScaleError();
    }

    return tokens.map((token) => NoteFactory.fromToken(token));
  },
} as const;
