import { GraduationCap } from "lucide-react";
import { GameRunner } from "@/components/tools/quiz/GameRunner";
import { buildVocabGameQuestions } from "@/lib/quiz-content";

export function VocabularyQuiz() {
  return (
    <GameRunner
      subjectKey="vocabulary"
      title="Vocabulary Quiz"
      icon={GraduationCap}
      build={buildVocabGameQuestions}
      toolPath="/tool/vocabulary-quiz"
    />
  );
}
