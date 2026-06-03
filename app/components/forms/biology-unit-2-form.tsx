"use client";
import { questions_unit_2 as questions } from "@/lib/biology-questions";
import BiologyQuizForm from "@/app/components/forms/biology-quiz-form";

export default function BiologyUnit2Form() {
  return (
    <BiologyQuizForm
      questions={questions}
      storagePrefix="biologyUnit2"
      title="الباب الثاني: الجهاز العصبي"
    />
  );
}
