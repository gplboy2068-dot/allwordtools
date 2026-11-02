import { NotebookPen } from "lucide-react";
import { GameRunner } from "@/components/tools/quiz/GameRunner";
import { buildPrefixGameQuestions } from "@/lib/quiz-content";

export function PrefixQuiz() {
  return (
    <GameRunner
      subjectKey="prefix"
      title="Prefix Quiz"
      icon={NotebookPen}
      build={buildPrefixGameQuestions}
      toolPath="/tool/prefix-quiz"
    />
  );
}
