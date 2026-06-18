import type { Note } from '../note/Note';
import type { NamingConvention, NoteNamingStrategy } from './NoteNamingStrategy';

export class FlatNamingStrategy implements NoteNamingStrategy {
  public readonly id: NamingConvention = 'flat';

  private static readonly NAMES: readonly string[] = [
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
    'Ab',
    'A',
    'Bb',
    'B',
  ];

  public format(note: Note): string {
    const name = FlatNamingStrategy.NAMES[note.pitchClass];
    return name ?? '';
  }
}
