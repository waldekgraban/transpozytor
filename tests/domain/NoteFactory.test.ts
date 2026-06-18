import { describe, expect, it } from 'vitest';
import { NoteFactory } from '../../src/domain/note/NoteFactory';
import { InvalidNoteError } from '../../src/domain/errors/InvalidNoteError';

describe('NoteFactory (Factory)', () => {
  it.each([
    ['C', 0],
    ['D', 2],
    ['E', 4],
    ['F', 5],
    ['G', 7],
    ['A', 9],
    ['B', 11],
  ])('parsuje dźwięk naturalny %s -> pitchClass %i', (token, pitchClass) => {
    expect(NoteFactory.fromToken(token).pitchClass).toBe(pitchClass);
  });

  it('parsuje krzyżyki i bemole, normalizując przez granice (Cb -> 11, B# -> 0)', () => {
    expect(NoteFactory.fromToken('Cb').pitchClass).toBe(11);
    expect(NoteFactory.fromToken('B#').pitchClass).toBe(0);
  });

  it('akceptuje małe litery oraz białe znaki', () => {
    expect(NoteFactory.fromToken('  f#  ').pitchClass).toBe(6);
  });

  it('zachowuje preferencję zapisu enharmonicznego', () => {
    expect(NoteFactory.fromToken('C#').preference).toBe('sharp');
    expect(NoteFactory.fromToken('Db').preference).toBe('flat');
    expect(NoteFactory.fromToken('D').preference).toBe('natural');
  });

  it.each(['H', 'C#b', '123', '', 'Cx'])('odrzuca niepoprawny token "%s"', (token) => {
    expect(() => NoteFactory.fromToken(token)).toThrow(InvalidNoteError);
  });
});
