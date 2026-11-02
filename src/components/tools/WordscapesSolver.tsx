import { CircleLetterSolver } from "./solvers/CircleLetterSolver";

export function WordscapesSolver() {
  return (
    <CircleLetterSolver
      historyKey="wordscapes"
      placeholder="Enter your Wordscapes letters"
      buttonLabel="Solve level"
      minLength={3}
      maxLetters={9}
      helpText="Type the letters in the wheel at the bottom of the level. We'll find every word — including the bonus words — grouped by length."
    />
  );
}
