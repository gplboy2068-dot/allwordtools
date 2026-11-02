import { KnownLettersSolver } from "./solvers/KnownLettersSolver";

export function WheelOfFortuneSolver() {
  return (
    <KnownLettersSolver
      historyKey="wheel-of-fortune"
      label="Enter one word of the puzzle with the letters revealed so far"
      placeholder="e.g. ?u??le, ?o?tune"
      buttonLabel="Solve word"
      helpText="Solve the board one word at a time — type a blank for each hidden square and fill in the letters already called."
    />
  );
}
