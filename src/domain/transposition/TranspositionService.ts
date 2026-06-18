import type { Interval } from '../interval/Interval';
import type { Note } from '../note/Note';

export class TranspositionService {
  public transpose(notes: readonly Note[], interval: Interval): readonly Note[] {
    return notes.map((note) => note.transpose(interval));
  }
}
