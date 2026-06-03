"use client";
import { questions_unit_7 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit7Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit7"
      title="الباب السابع: التكاثر الخلوي"
    />
  );
}
