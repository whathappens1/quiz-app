"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { questions } from "@/lib/questions";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Github } from "lucide-react";

export default function Component() {
  const [showResults, setShowResults] = useState(false);
  const [mustComplete] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: Object.fromEntries(
      questions.map((q) => [`question-${q.id}`, ""])
    ),
  });

  // Watch all question answers
  const allAnswers = questions.map((q) => watch(`question-${q.id}`));

  // Remove unused mustComplete state
  const isAllQuestionsAnswered = allAnswers.every((answer) => answer !== "");

  const onSubmit = () => {
    if (mustComplete) {
      if (isAllQuestionsAnswered) {
        let correct = 0;
        let incorrect = 0;
        questions.forEach((question) => {
          const userAnswer = watch(`question-${question.id}`);
          if (userAnswer === question.correctAnswer) {
            correct++;
          } else {
            incorrect++;
          }
        });
        setCorrectAnswers(correct);
        setIncorrectAnswers(incorrect);
        setShowResults(true);
      } else {
        toast.error("الرجاء الإجابة على جميع الأسئلة قبل الإرسال");
      }
    } else {
      let correct = 0;
      let incorrect = 0;
      questions.forEach((question) => {
        const userAnswer = watch(`question-${question.id}`);
        if (userAnswer === question.correctAnswer) {
          correct++;
        } else if (userAnswer !== "") {
          incorrect++;
        }
      });
      setCorrectAnswers(correct);
      setIncorrectAnswers(incorrect);
      setShowResults(true);
    }
  };

  const formVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };

  const resultsVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <div
      className="container mx-auto py-24 pb-32 max-w-screen-md p-4"
      dir="rtl"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-2 sm:flex-row flex flex-col  items-center justify-center gap-2"
      >
        أختبار علم البيئة
        <div className="flex items-center justify-center gap-2">
          <Badge variant="default" className="text-base">
            صف أول ثانوي
          </Badge>
          <Badge variant="default" className="text-base">
            محاكي نهائي
          </Badge>
        </div>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-wrap gap-2 mb-8"
      >
        <Badge variant="secondary" className="text-sm">ثانوية زهير بن قيس</Badge>
        <Badge variant="secondary" className="text-sm">المعلم: عبدالخالق جبره</Badge>
        <Badge variant="secondary" className="text-sm">عدد الأسئلة: {questions.length}</Badge>

        <div className="flex items-center gap-2 justify-center">
          <ModeToggle />
          <a
            href="https://github.com/whathappens1/quiz-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <Github className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">github</span>
            </Button>
          </a>
        </div>
      </motion.div>
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.form
            key="quiz-form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {questions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: question.id * 0.1 }}
              >
                <Card className="mb-6">
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
                    <CardTitle
                      dir="rtl"
                      className="flex items-center justify-start gap-2"
                    >
                      {question.text}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      dir="rtl"
                      defaultValue=""
                      onValueChange={(value) =>
                        setValue(`question-${question.id}`, value)
                      }
                      value={watch(`question-${question.id}`)}
                    >
                      {question.options.map((option, index) => (
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
                    {errors[`question-${question.id}`] && (
                      <p className="text-red-500 mt-2">هذا الحقل مطلوب</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.form>
        ) : (
          <motion.div
            key="results"
            variants={resultsVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold mb-4">النتائج:</h2>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>ملخص النتائج</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  className={`bg-green-500 dark:bg-green-600  hover:bg-green-600 hover:opacity-90 text-white`}
                  variant={"default"}
                >
                  <p>الإجابات الصحيحة: {correctAnswers}</p>
                </Badge>
                <br />
                <Badge
                  className={`bg-red-500 dark:bg-red-600 hover:bg-red-600 hover:opacity-90 text-white`}
                  variant={"default"}
                >
                  <p>الإجابات الخاطئة: {incorrectAnswers}</p>
                </Badge>
                <p>
                  النسبة المئوية للإجابات الصحيحة:{" "}
                  {((correctAnswers / questions.length) * 100).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
            {questions.map((question) => {
              const userAnswer = watch(`question-${question.id}`);
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <Card key={question.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{question.text}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>إجابتك: {userAnswer || "لم تجب"}</p>
                    <p>الإجابة الصحيحة: {question.correctAnswer}</p>
                    <Badge
                      className={`${
                        isCorrect
                          ? "bg-green-500 dark:bg-green-600 hover:bg-green-600 hover:opacity-90"
                          : "bg-red-500 dark:bg-red-600 hover:bg-red-600 hover:opacity-90"
                      } text-white`}
                      variant={"default"}
                    >
                      <p>{isCorrect ? "إجابة صحيحة!" : "إجابة خاطئة"}</p>
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-center text-muted-foreground">
            ملاحظة: جميع الاسئلة من{" "}
            <a href="https://t.me/+qTLPMOCOk54wODVk" target="_blank" rel="noopener noreferrer">
              <span className="text-black dark:text-white underline cursor-pointer">
                قروب تيليجرام المادة للمعلم عبدالخالق جبر
              </span>
            </a>{" "}
            تم جمع الاسئلة بواسطة الذكاء الاصطناعي وجميع الإجابات الصحيحة في
            الاختبار قد تحتمل نسبة خطأ!
          </p>
          <Separator className="my-4" />
          <p className="text-muted-foreground text-sm text-center">
            كل الحقوق محفوظة لـ{" "}
            <span className="text-black dark:text-white">تميم السهلي</span> ©
            2025.
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="border-t w-full fixed bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.div
            transition={{ duration: 0.5 }}
            variants={resultsVariants}
            initial="hidden"
            animate="visible"
            className="px-4 py-8 container max-w-screen-md mx-auto"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              {!showResults ? (
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="w-full"
                  disabled={mustComplete && !isAllQuestionsAnswered}
                >
                  {mustComplete && !isAllQuestionsAnswered
                    ? "الرجاء الإجابة على جميع الأسئلة"
                    : "إرسال الإجابات"}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setCorrectAnswers(0);
                    setIncorrectAnswers(0);
                    questions.forEach((q) => setValue(`question-${q.id}`, ""));
                  }}
                  className="w-full"
                >
                  إعادة الاختبار
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
