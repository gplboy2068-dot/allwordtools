import { KnownLettersSolver } from "./solvers/KnownLettersSolver";

export function CodyCrossSolver() {
  return (
    <KnownLettersSolver
      historyKey="codycross"
      label="Enter the answer length and any crossing letters you already know"
      placeholder="e.g. ?a?e??, s?lve?"
      buttonLabel="Solve clue"
      helpText="Type one square per letter of the CodyCross answer, filling in the letters revealed by crossing words."
    />
  );
}
