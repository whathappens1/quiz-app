import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Question } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

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
  if (isResult == true) {
    return (
      <div>
        {WithoutIntro == false && question.intro && (
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

            <div className={`relative z-10 sm:pb-4 pb-0`}>
              <CardHeader className="">
                <CardTitle
                  dir="rtl"
                  className="flex items-center justify-start gap-2"
                >
                  {question.intro.text}
                </CardTitle>
              </CardHeader>
            </div>
          </Card>
        )}
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
        {WithoutIntro == false && question.intro && (
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

            <div className={`relative z-10 sm:pb-4 pb-0`}>
              <CardHeader className="">
                <CardTitle
                  dir="rtl"
                  className="flex items-center justify-start gap-2"
                >
                  {question.intro.text}
                </CardTitle>
              </CardHeader>
            </div>
          </Card>
        )}
        <Card className="mb-6 relative z-10 overflow-hidden">
          <div className={`relative z-10`}>
            <CardHeader className="">
              <div className="flex items-center justify-between gap-2">
                <Badge dir="rtl" className="w-fit">
                  سؤال رقم {question.id}
                </Badge>
                <Badge
                  variant={
                    question.type == "question" ? "default" : "secondary"
                  }
                  dir="rtl"
                  className="w-fit"
                >
                  سؤال {question.type == "question" ? "من متعدد" : "مقالي"}
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
              {question.type == "question" ? (
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

export default QuestionCard;
