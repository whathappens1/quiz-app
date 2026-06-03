import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useMemo } from "react";
import { Question } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Check, X } from "lucide-react";

type QuizFormValues = Record<string, string>;

export interface QuestionCardProps {
  isResult?: boolean;
  userAnswer?: string;
  isCorrect?: boolean;
  question: Question;
  errors?: FieldErrors<QuizFormValues>;
  setValue?: UseFormSetValue<QuizFormValues>;
  watch?: UseFormWatch<QuizFormValues>;
  WithoutIntro?: boolean;
}

function IntroCard({ question }: { question: Question }) {
  if (!question.intro) return null;
  return (
    <Card className="mb-6 relative z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 backdrop-blur-sm"
        style={{
          backgroundImage: `url(${
            question.intro?.imageURL || "/placeholder.svg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="relative z-10 sm:pb-4 pb-0">
        <CardHeader>
          <CardTitle
            dir="rtl"
            className="flex items-center justify-start gap-2"
          >
            {question.intro.text}
          </CardTitle>
        </CardHeader>
      </div>
    </Card>
  );
}

function QuestionCard({
  isResult = false,
  question,
  userAnswer,
  isCorrect,
  errors,
  setValue,
  watch,
  WithoutIntro = false,
}: QuestionCardProps) {
  const shuffledDefinitions = useMemo(() => {
    if (question.type !== "match" || !question.matchItems) return [];
    const defs = question.matchItems.map((item) => item.definition);
    const copy = [...defs];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [question.type, question.matchItems]);

  if (isResult == true) {
    if (question.type === "match" && question.matchItems) {
      const allCorrect = question.matchItems.every((item, idx) => {
        const selected = watch
          ? watch(`question-${question.id}-match-${idx}`)
          : "";
        return selected === item.definition;
      });

      return (
        <div>
          {WithoutIntro == false && <IntroCard question={question} />}
          <Card className="mb-4">
            <CardHeader>
              <Badge dir="rtl" className="w-fit">
                سؤال رقم {question.id}
              </Badge>
              <CardTitle>{question.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <div dir="rtl" className="overflow-x-auto rounded-[12px] border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-2 text-right font-semibold border-b">
                        العمود (أ)
                      </th>
                      <th className="px-4 py-2 text-right font-semibold border-b">
                        إجابتك
                      </th>
                      <th className="px-4 py-2 text-right font-semibold border-b">
                        الإجابة الصحيحة
                      </th>
                      <th className="px-4 py-2 text-center font-semibold border-b w-12">
                        النتيجة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {question.matchItems.map((item, idx) => {
                      const selected = watch
                        ? (watch(
                            `question-${question.id}-match-${idx}`
                          ) as string)
                        : "";
                      const rowCorrect = selected === item.definition;
                      return (
                        <tr
                          key={idx}
                          className={`border-b last:border-b-0 ${
                            rowCorrect
                              ? "bg-green-50 dark:bg-green-950/30"
                              : "bg-red-50 dark:bg-red-950/30"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium">{item.term}</td>
                          <td className="px-4 py-3">{selected || "لم تجب"}</td>
                          <td className="px-4 py-3">{item.definition}</td>
                          <td className="px-4 py-3 text-center">
                            {rowCorrect ? (
                              <Check className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-red-600 mx-auto" />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-3">
                <Badge
                  className={`${
                    allCorrect
                      ? "bg-green-500 dark:bg-green-600 hover:bg-green-600 hover:opacity-90"
                      : "bg-red-500 dark:bg-red-600 hover:bg-red-600 hover:opacity-90"
                  } text-white transition-all`}
                  variant="default"
                >
                  <p>
                    {allCorrect
                      ? "إجابة صحيحة!"
                      : "إجابة خاطئة"}
                  </p>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div>
        {WithoutIntro == false && <IntroCard question={question} />}
        <Card className="mb-4">
          <CardHeader>
            <Badge dir="rtl" className="w-fit">
              سؤال رقم {question.id}
            </Badge>
            {question?.imageURL && (
              <div className="my-3">
                <Image
                  src={question?.imageURL || "/placeholder.svg"}
                  alt="Question image"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="rounded-xl bg-muted border w-72 h-full object-contain mb-2"
                />
              </div>
            )}
            <CardTitle>{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              إجابتك:{" "}
              <span className="font-bold">{userAnswer || "لم تجب"} </span>
            </p>
            <p>
              الإجابة الصحيحة:{" "}
              <span className="font-bold">{question.correctAnswer} </span>
            </p>
            <Badge
              className={`${
                isCorrect
                  ? "bg-green-500 dark:bg-green-600 hover:bg-green-600 hover:opacity-90"
                  : "bg-red-500 dark:bg-red-600 hover:bg-red-600 hover:opacity-90"
              } text-white transition-all`}
              variant={"default"}
            >
              <p>{isCorrect ? "إجابة صحيحة!" : "إجابة خاطئة"}</p>
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  } else if (isResult == false) {
    return (
      <div>
        {WithoutIntro == false && <IntroCard question={question} />}
        <Card className="mb-6 relative z-10 overflow-hidden">
          <div className="relative z-10">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <Badge dir="rtl" className="w-fit">
                  سؤال رقم {question.id}
                </Badge>
                <Badge
                  variant={
                    question.type == "multiple"
                      ? "default"
                      : question.type == "match"
                      ? "outline"
                      : "secondary"
                  }
                  dir="rtl"
                  className="w-fit"
                >
                  {question.type == "multiple"
                    ? "سؤال من متعدد"
                    : question.type == "match"
                    ? "سؤال توصيل"
                    : "سؤال مقالي"}
                </Badge>
              </div>
              {question?.imageURL && (
                <div className="my-3">
                  <Image
                    src={question?.imageURL || "/placeholder.svg"}
                    alt="Question image"
                    width={200}
                    height={200}
                    loading="lazy"
                    className="rounded-xl bg-muted border w-72 h-full object-contain mb-2"
                  />
                </div>
              )}
              <CardTitle
                dir="rtl"
                className="flex items-center justify-start gap-2 pt-1 text-wrap w-full"
              >
                {question.text}
              </CardTitle>
            </CardHeader>

            <CardContent>
              {question.type == "multiple" ? (
                <>
                  <RadioGroup
                    dir="rtl"
                    defaultValue=""
                    onValueChange={(value) => {
                      if (setValue) {
                        setValue(`question-${question.id}`, String(value));
                      }
                    }}
                    value={
                      watch
                        ? String(watch(`question-${question.id}`) || "")
                        : ""
                    }
                  >
                    {question.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <RadioGroupItem
                          value={option}
                          id={`q${question.id}-${index}`}
                        />
                        <Label htmlFor={`q${question.id}-${index}`}>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors && errors[`question-${question.id}`] && (
                    <p className="text-red-500 mt-2">هذا الحقل مطلوب</p>
                  )}
                </>
              ) : question.type == "match" && question.matchItems ? (
                <MatchQuizTable
                  question={question}
                  shuffledDefinitions={shuffledDefinitions}
                  watch={watch}
                  setValue={setValue}
                />
              ) : (
                <div>
                  <p>{question.correctAnswer}</p>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

function MatchQuizTable({
  question,
  shuffledDefinitions,
  watch,
  setValue,
}: {
  question: Question;
  shuffledDefinitions: string[];
  watch?: UseFormWatch<QuizFormValues>;
  setValue?: UseFormSetValue<QuizFormValues>;
}) {
  const items = question.matchItems!;

  const getVal = (idx: number) =>
    watch ? (watch(`question-${question.id}-match-${idx}`) as string) || "" : "";

  const handleSelect = (idx: number, newValue: string) => {
    if (!setValue) return;
    if (newValue) {
      items.forEach((_, otherIdx) => {
        if (otherIdx !== idx && getVal(otherIdx) === newValue) {
          setValue(`question-${question.id}-match-${otherIdx}`, "");
        }
      });
    }
    setValue(`question-${question.id}-match-${idx}`, newValue);
  };

  return (
    <div dir="rtl" className="overflow-x-auto rounded-[12px] border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-4 py-2 text-right font-semibold border-b">
              العمود (أ)
            </th>
            <th className="px-4 py-2 text-right font-semibold border-b">
              العمود (ب)
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const fieldKey = `question-${question.id}-match-${idx}`;
            const selectedValue = getVal(idx);

            return (
              <tr
                key={idx}
                className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium align-middle">
                  {item.term}
                </td>
                <td className="px-4 py-3 align-middle">
                  <Select
                    dir="rtl"
                    value={selectedValue || undefined}
                    onValueChange={(val) => handleSelect(idx, val)}
                    key={fieldKey + "-" + selectedValue}
                  >
                    <SelectTrigger className="w-full rounded-[8px] cursor-pointer">
                      <SelectValue placeholder="اختر الإجابة..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-[8px]">
                      {shuffledDefinitions.map((def, dIdx) => (
                        <SelectItem
                          className="rounded-[8px]"
                          key={dIdx}
                          value={def}
                        >
                          {def}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionCard;
