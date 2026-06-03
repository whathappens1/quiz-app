"use client";
import { questions_unit_3 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit3Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit3"
      title="الباب الثالث: أجهزة الدوران والتنفس والإخراج"
    />
  );
}
