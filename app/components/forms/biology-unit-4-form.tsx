"use client";
import { questions_unit_4 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit4Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit4"
      title="الباب الرابع: جهاز الهضم والغدد الصم"
    />
  );
}
