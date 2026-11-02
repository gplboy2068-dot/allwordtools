import { KnownLettersSolver } from "./solvers/KnownLettersSolver";

export function SevenLittleWordsSolver() {
  return (
    <KnownLettersSolver
      historyKey="seven-little-words"
      label="Enter the word length and any letters you already have"
      placeholder="e.g. ??????? or c????y"
      buttonLabel="Find words"
      helpText="7 Little Words tells you exactly how many letters each answer has — add one blank per letter, plus any tiles you've already placed."
    />
  );
}
