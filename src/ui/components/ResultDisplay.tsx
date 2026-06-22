import { memo } from 'react';
import type { TransposeScaleResult } from '../../application/TransposeScaleUseCase';

export interface ResultDisplayProps {
  readonly result: TransposeScaleResult | null;
  readonly errorMessage: string | null;
}

export const ResultDisplay = memo(({ result, errorMessage }: ResultDisplayProps) => {
  if (errorMessage !== null) {
    return (
      <p className="result result--error" role="alert">
        {errorMessage}
      </p>
    );
  }

  if (result === null) {
    return null;
  }

  return (
    <section className="result" aria-live="polite">
      <p className="result__row">
        <span className="result__label">Wejście</span>
        <code>{result.inputNotes.join(', ')}</code>
      </p>
      <p className="result__row">
        <span className="result__label">Interwał</span>
        <code>{result.intervalLabel}</code>
      </p>
      <p className="result__row result__row--highlight">
        <span className="result__label">Wynik</span>
        <code>{result.outputNotes.join(', ')}</code>
      </p>
    </section>
  );
});

ResultDisplay.displayName = 'ResultDisplay';
