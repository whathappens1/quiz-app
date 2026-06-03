"use client";
import { questions_unit_1 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit1Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit1"
      title="الباب الأول: الجهازان الهيكلي والعضلي"
    />
  );
}
