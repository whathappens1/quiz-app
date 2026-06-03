"use client";
import { questions_unit_5 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit5Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit5"
      title="الباب الخامس: التكاثر والنمو في الإنسان"
    />
  );
}
