import type { Note } from '../note/Note';
import type { NamingConvention, NoteNamingStrategy } from './NoteNamingStrategy';

export class SharpNamingStrategy implements NoteNamingStrategy {
  public readonly id: NamingConvention = 'sharp';

  private static readonly NAMES: readonly string[] = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  public format(note: Note): string {
    const name = SharpNamingStrategy.NAMES[note.pitchClass];
    return name ?? '';
  }
}
