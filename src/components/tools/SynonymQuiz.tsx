import { Equal } from "lucide-react";
import { GameRunner } from "@/components/tools/quiz/GameRunner";
import { buildSynonymGameQuestions } from "@/lib/quiz-content";

export function SynonymQuiz() {
  return (
    <GameRunner
      subjectKey="synonym"
      title="Synonym Quiz"
      icon={Equal}
      build={buildSynonymGameQuestions}
      toolPath="/tool/synonym-quiz"
    />
  );
}
