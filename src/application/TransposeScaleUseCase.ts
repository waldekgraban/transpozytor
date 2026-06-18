import {
  Interval,
  NamingStrategyFactory,
  ScaleParser,
  TranspositionService,
  isDomainError,
  err,
  ok,
  type DomainError,
  type NamingConvention,
  type Note,
  type NoteNamingStrategy,
  type Result,
} from '../domain';

export interface TransposeScaleCommand {
  readonly rawNotes: string;
  readonly semitones: number;
  readonly convention: NamingConvention;
}

export interface TransposeScaleResult {
  readonly inputNotes: readonly string[];
  readonly outputNotes: readonly string[];
  readonly intervalLabel: string;
}

export class TransposeScaleUseCase {
  public constructor(
    private readonly transpositionService: TranspositionService = new TranspositionService(),
  ) {}

  public execute(command: TransposeScaleCommand): Result<TransposeScaleResult, DomainError> {
    try {
      const interval = Interval.ofSemitones(command.semitones);
      const inputNotes = ScaleParser.parse(command.rawNotes);
      const strategy = NamingStrategyFactory.create(command.convention);

      const outputNotes = this.transpositionService.transpose(inputNotes, interval);

      return ok({
        inputNotes: this.render(inputNotes, strategy),
        outputNotes: this.render(outputNotes, strategy),
        intervalLabel: interval.toString(),
      });
    } catch (error: unknown) {
      if (isDomainError(error)) {
        return err(error);
      }

      throw error;
    }
  }

  private render(notes: readonly Note[], strategy: NoteNamingStrategy): readonly string[] {
    return notes.map((note) => strategy.format(note));
  }
}
