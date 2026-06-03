"use client";
import { questions_unit_9 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit9Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit9"
      title="الباب التاسع: الوراثة المعقدة والوراثة البشرية"
    />
  );
}
