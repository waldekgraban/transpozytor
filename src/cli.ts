import { TransposeScaleUseCase } from './application/TransposeScaleUseCase';
import { isErr, type NamingConvention } from './domain';

const [, , rawNotes, rawSemitones, rawConvention = 'sharp'] = process.argv;

if (rawNotes === undefined || rawSemitones === undefined) {
  console.error('Użycie: npm run cli -- "C, D, E" <półtony> [sharp|flat]');
  process.exit(1);
}

const convention: NamingConvention = rawConvention === 'flat' ? 'flat' : 'sharp';
const useCase = new TransposeScaleUseCase();

const result = useCase.execute({
  rawNotes,
  semitones: Number(rawSemitones),
  convention,
});

if (isErr(result)) {
  console.error(`Błąd [${result.error.code}]: ${result.error.message}`);
  process.exit(1);
}

console.log(`Wejście:  ${result.value.inputNotes.join(', ')}`);
console.log(`Interwał: ${result.value.intervalLabel}`);
console.log(`Wynik:    ${result.value.outputNotes.join(', ')}`);
