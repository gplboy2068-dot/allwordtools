import { Contrast } from "lucide-react";
import { GameRunner } from "@/components/tools/quiz/GameRunner";
import { buildAntonymGameQuestions } from "@/lib/quiz-content";

export function AntonymQuiz() {
  return (
    <GameRunner
      subjectKey="antonym"
      title="Antonym Quiz"
      icon={Contrast}
      build={buildAntonymGameQuestions}
      toolPath="/tool/antonym-quiz"
    />
  );
}
