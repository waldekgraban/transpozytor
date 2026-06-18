export type AccidentalPreference = 'sharp' | 'flat' | 'natural';

export const Accidental = {
  SHARP_SYMBOL: '#',
  FLAT_SYMBOL: 'b',

  fromSymbol(symbol: string): AccidentalPreference {
    switch (symbol) {
      case '#':
      case '♯':
        return 'sharp';
      case 'b':
      case '♭':
        return 'flat';
      default:
        return 'natural';
    }
  },
} as const;
