import type { NamingConvention } from '../../domain';

export interface TranspositionFormProps {
  readonly rawNotes: string;
  readonly semitones: number;
  readonly convention: NamingConvention;
  readonly conventions: readonly NamingConvention[];
  readonly onRawNotesChange: (value: string) => void;
  readonly onSemitonesChange: (value: number) => void;
  readonly onConventionChange: (value: NamingConvention) => void;
  readonly onSubmit: () => void;
}

const CONVENTION_LABELS: Record<NamingConvention, string> = {
  sharp: 'Krzyżyki (#)',
  flat: 'Bemole (b)',
};

export function TranspositionForm({
  rawNotes,
  semitones,
  convention,
  conventions,
  onRawNotesChange,
  onSemitonesChange,
  onConventionChange,
  onSubmit,
}: TranspositionFormProps): JSX.Element {
  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="field">
        <span>Dźwięki gamy</span>
        <input
          type="text"
          value={rawNotes}
          placeholder="np. C, D, E, F"
          onChange={(event) => onRawNotesChange(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Przesunięcie (półtony)</span>
        <input
          type="number"
          value={semitones}
          onChange={(event) => onSemitonesChange(Number(event.target.value))}
        />
      </label>

      <label className="field">
        <span>Konwencja zapisu</span>
        <select
          value={convention}
          onChange={(event) => onConventionChange(event.target.value as NamingConvention)}
        >
          {conventions.map((option) => (
            <option key={option} value={option}>
              {CONVENTION_LABELS[option]}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Transponuj</button>
    </form>
  );
}
