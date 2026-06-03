"use client";
import { questions_unit_8 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit8Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit8"
      title="الباب الثامن: التكاثر الجنسي والوراثة"
    />
  );
}
