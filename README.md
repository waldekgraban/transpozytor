# Transpozytor gam

Narzędzie do transpozycji dźwięków gamy o zadaną liczbę półtonów.

> Wejście: `"C, D, E, F"` + `+2` → Wyjście: `"D, E, F#, G"`

---

## Filozofia projektu

Kod jest podzielony na trzy koncentryczne warstwy. **Reguła zależności** jest jednokierunkowa:
warstwy zewnętrzne zależą od wewnętrznych, nigdy odwrotnie.

```
            ┌──────────────────────────────────────────┐
            │                    UI (React)             │  ← framework, DOM
            │   components / hooks / ErrorBoundary       │
            │        ┌──────────────────────────┐       │
            │        │     APPLICATION           │       │  ← orkiestracja (use case)
            │        │   TransposeScaleUseCase   │       │
            │        │   ┌──────────────────┐    │       │
            │        │   │     DOMAIN        │    │       │  ← czysty TS, zero zależności
            │        │   │ Note / Interval   │    │       │
            │        │   │ Strategy / Service│    │       │
            │        │   └──────────────────┘    │       │
            │        └──────────────────────────┘       │
            └──────────────────────────────────────────┘
```

Warstwa **domeny nie importuje ani Reacta, ani niczego z `application`/`ui`** — pilnuje tego reguła
ESLint (`no-restricted-imports`). Dzięki temu ten sam silnik napędza UI (`npm run dev`)
i CLI w Node.js (`npm run cli`).

## Struktura katalogów

```
src/
├── domain/                      
│   ├── shared/
│   │   ├── Brand.ts             
│   │   └── Result.ts             
│   ├── errors/                   
│   │   ├── DomainError.ts        
│   │   ├── InvalidNoteError.ts
│   │   ├── InvalidIntervalError.ts
│   │   └── EmptyScaleError.ts
│   ├── note/
│   │   ├── PitchClass.ts        
│   │   ├── Accidental.ts         
│   │   ├── Note.ts              
│   │   ├── NoteFactory.ts       
│   │   └── ScaleParser.ts        
│   ├── interval/
│   │   └── Interval.ts          
│   ├── naming/                   
│   │   ├── NoteNamingStrategy.ts #   
│   │   ├── SharpNamingStrategy.ts
│   │   ├── FlatNamingStrategy.ts
│   │   └── NamingStrategyFactory.ts
│   ├── transposition/
│   │   └── TranspositionService.ts  
│   └── index.ts                  
├── application/
│   └── TransposeScaleUseCase.ts  
├── ui/
│   ├── hooks/
│   │   └── useTransposition.ts  
│   └── components/
│       ├── TranspositionForm.tsx 
│       ├── ResultDisplay.tsx     
│       ├── ErrorBoundary.tsx     
│       └── TransposerApp.tsx     
├── cli.ts                       
└── main.tsx                     

tests/                            
├── domain/
└── application/
```


| Obszar | Realizacja |
| --- | --- |
| **Value Object** | `Note`, `Interval` — niemutowalne, prywatny konstruktor, równość przez wartość |
| **Factory** | `NoteFactory`, `NamingStrategyFactory` — kontrolowane tworzenie z walidacją |
| **Strategy** | `NoteNamingStrategy` (sharp/flat) — wymienne konwencje nazewnictwa (OCP) |
| **Domain Service** | `TranspositionService` — operacja bezstanowa na agregacie dźwięków |
| **Opaque Types** | `PitchClass` (branded `number`) — stany niepoprawne niereprezentowalne |
| **Discriminated Union** | `Result<T,E>`, kody błędów — wyczerpujące dopasowanie wymuszane przez typy |
| **Custom Errors** | hierarchia `DomainError` ze stabilnymi `code` |
| **Error Boundary** | `ErrorBoundary` — ochrona przed "białym ekranem" |
| **Enharmonia** | `isEnharmonicWith` vs `equals`; C# ≡ Db brzmieniowo, różne w pisowni |

## Uruchomienie

```bash
npm install

npm run dev          # aplikacja React (Vite)
npm run cli -- "C, D, E, F" 2          # CLI: -> D, E, F#, G
npm run cli -- "C, D, E, F" 2 flat     # CLI w konwencji bemolowej

npm test             # testy jednostkowe
npm run typecheck    # weryfikacja typów (strict)
npm run lint         # ESLint (m.in. zakaz any i ochrona czystości domeny)
```

## Decyzje projektowe

- **Domena rzuca wyjątki, aplikacja zwraca `Result`.** Rdzeń stosuje fail-fast (czytelne, lokalne
  inwarianty), a granica aplikacji tłumaczy je na jawny `Result`, by UI nie musiał używać `try/catch`.
- **Enharmonia w uproszczeniu.** Model sprowadza pisownię do `PitchClass`, zachowując intencję
  zapisu (`AccidentalPreference`); konwencję wyjścia wybiera strategia. Pełny model teoretyczno-muzyczny
  (np. podwójne alteracje, poprawność stopni gamy) celowo pominięte zgodnie z KISS.
```
