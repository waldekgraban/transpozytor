import { describe, expect, it } from 'vitest';
import { Interval } from '../../src/domain/interval/Interval';
import { NoteFactory } from '../../src/domain/note/NoteFactory';

describe('Note (Value Object)', () => {
  it('transponuje dźwięk w górę zwracając nową instancję (niemutowalność)', () => {
    const c = NoteFactory.fromToken('C');
    const d = c.transpose(Interval.ofSemitones(2));

    expect(d.equals(NoteFactory.fromToken('D'))).toBe(true);
    expect(c.equals(NoteFactory.fromToken('C'))).toBe(true);
    expect(c).not.toBe(d);
  });

  it('zawija się przez granicę oktawy (B + 1 -> C)', () => {
    const b = NoteFactory.fromToken('B');
    expect(b.transpose(Interval.ofSemitones(1)).isEnharmonicWith(NoteFactory.fromToken('C'))).toBe(
      true,
    );
  });

  it('obsługuje transpozycję w dół z zawijaniem (C - 1 -> B)', () => {
    const c = NoteFactory.fromToken('C');
    expect(c.transpose(Interval.ofSemitones(-1)).isEnharmonicWith(NoteFactory.fromToken('B'))).toBe(
      true,
    );
  });

  describe('enharmonia', () => {
    it('uznaje C# i Db za enharmonicznie równoważne', () => {
      expect(NoteFactory.fromToken('C#').isEnharmonicWith(NoteFactory.fromToken('Db'))).toBe(true);
    });

    it('ale rozróżnia je przy równości ścisłej (inna pisownia)', () => {
      expect(NoteFactory.fromToken('C#').equals(NoteFactory.fromToken('Db'))).toBe(false);
    });
  });

  it('transpozycja o pełną oktawę (12) daje ten sam dźwięk', () => {
    const e = NoteFactory.fromToken('E');
    expect(e.transpose(Interval.ofSemitones(12)).isEnharmonicWith(e)).toBe(true);
  });
});
