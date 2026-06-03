"use client";
import { questions_unit_10 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit10Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit10"
      title="الباب العاشر: الوراثة الجزيئية"
    />
  );
}
