import { ListChecks } from "lucide-react";
import { GameRunner } from "@/components/tools/quiz/GameRunner";
import { buildSuffixGameQuestions } from "@/lib/quiz-content";

export function SuffixQuiz() {
  return (
    <GameRunner
      subjectKey="suffix"
      title="Suffix Quiz"
      icon={ListChecks}
      build={buildSuffixGameQuestions}
      toolPath="/tool/suffix-quiz"
    />
  );
}
