import { CircleLetterSolver } from "./solvers/CircleLetterSolver";

export function WordCookiesSolver() {
  return (
    <CircleLetterSolver
      historyKey="word-cookies"
      placeholder="Enter your Word Cookies letters"
      buttonLabel="Solve cookies"
      minLength={3}
      maxLetters={9}
      helpText="Type every letter in the cookie tray. We'll list every valid word, grouped by length, so you can clear the level fast."
    />
  );
}
