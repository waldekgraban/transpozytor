import { FlatNamingStrategy } from './FlatNamingStrategy';
import type { NamingConvention, NoteNamingStrategy } from './NoteNamingStrategy';
import { SharpNamingStrategy } from './SharpNamingStrategy';

const STRATEGIES: Record<NamingConvention, NoteNamingStrategy> = {
  sharp: new SharpNamingStrategy(),
  flat: new FlatNamingStrategy(),
};

export const NamingStrategyFactory = {
  create(convention: NamingConvention): NoteNamingStrategy {
    return STRATEGIES[convention];
  },

  availableConventions(): readonly NamingConvention[] {
    return Object.keys(STRATEGIES) as NamingConvention[];
  },
} as const;
