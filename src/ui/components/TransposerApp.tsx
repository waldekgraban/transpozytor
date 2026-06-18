import { useMemo } from 'react';
import { NamingStrategyFactory } from '../../domain';
import { useTransposition } from '../hooks/useTransposition';
import { ResultDisplay } from './ResultDisplay';
import { TranspositionForm } from './TranspositionForm';

export function TransposerApp(): JSX.Element {
  const { rawNotes, semitones, convention, result, error, setRawNotes, setSemitones, setConvention, transpose } =
    useTransposition();

  const conventions = useMemo(() => NamingStrategyFactory.availableConventions(), []);

  return (
    <main className="app">
      <header className="app__header">
        <h1>Transpozytor gam</h1>
        <p>Przetransponuj dźwięki gamy o dowolną liczbę półtonów.</p>
      </header>

      <TranspositionForm
        rawNotes={rawNotes}
        semitones={semitones}
        convention={convention}
        conventions={conventions}
        onRawNotesChange={setRawNotes}
        onSemitonesChange={setSemitones}
        onConventionChange={setConvention}
        onSubmit={transpose}
      />

      <ResultDisplay result={result} errorMessage={error?.message ?? null} />
    </main>
  );
}
