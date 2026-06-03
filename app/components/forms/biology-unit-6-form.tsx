"use client";
import { questions_unit_6 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit6Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit6"
      title="الباب السادس: جهاز المناعة"
    />
  );
}
