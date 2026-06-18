import type { Note } from '../note/Note';

export interface NoteNamingStrategy {
  readonly id: NamingConvention;

  format(note: Note): string;
}

export type NamingConvention = 'sharp' | 'flat';
