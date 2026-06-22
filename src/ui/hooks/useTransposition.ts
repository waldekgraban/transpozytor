import { useCallback, useState } from 'react';
import {
  TransposeScaleUseCase,
  type TransposeScaleResult,
} from '../../application/TransposeScaleUseCase';
import { isErr, type DomainError, type NamingConvention } from '../../domain';

export interface TranspositionViewState {
  readonly rawNotes: string;
  readonly semitones: number;
  readonly convention: NamingConvention;
  readonly result: TransposeScaleResult | null;
  readonly error: DomainError | null;
}

export interface UseTranspositionApi extends TranspositionViewState {
  setRawNotes: (value: string) => void;
  setSemitones: (value: number) => void;
  setConvention: (value: NamingConvention) => void;
  transpose: () => void;
}

const INITIAL_STATE: TranspositionViewState = {
  rawNotes: 'C, D, E, F, G, A, B',
  semitones: 2,
  convention: 'sharp',
  result: null,
  error: null,
};

const defaultUseCase = new TransposeScaleUseCase();

/**
 * @param useCase wstrzykiwalny use case (ułatwia testowanie/izolację).
 */
export function useTransposition(
  useCase: TransposeScaleUseCase = defaultUseCase,
): UseTranspositionApi {
  const [state, setState] = useState<TranspositionViewState>(INITIAL_STATE);

  const setRawNotes = useCallback((rawNotes: string) => {
    setState((prev) => ({ ...prev, rawNotes }));
  }, []);

  const setSemitones = useCallback((semitones: number) => {
    setState((prev) => ({ ...prev, semitones }));
  }, []);

  const setConvention = useCallback((convention: NamingConvention) => {
    setState((prev) => ({ ...prev, convention }));
  }, []);

  const transpose = useCallback(() => {
    setState((prev) => {
      const outcome = useCase.execute({
        rawNotes: prev.rawNotes,
        semitones: prev.semitones,
        convention: prev.convention,
      });

      return isErr(outcome)
        ? { ...prev, result: null, error: outcome.error }
        : { ...prev, result: outcome.value, error: null };
    });
  }, [useCase]);

  return { ...state, setRawNotes, setSemitones, setConvention, transpose };
}
