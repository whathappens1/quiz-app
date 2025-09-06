"use client";

import { useState, useEffect } from "react";
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
  // Add state to track if we're on client side
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize state with undefined first, then update from localStorage
  const [showResults, setShowResults] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quizShowResults");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [correctAnswers, setCorrectAnswers] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quizCorrectAnswers");
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });

  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quizIncorrectAnswers");
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });

  // Get saved answers array for calculations
  const savedAnswers = isClient
    ? Object.values(JSON.parse(localStorage.getItem("quizAnswers") || "{}")).filter(answer => answer !== "")
    : [];

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: isClient
      ? {
          ...Object.fromEntries(questions.map((q) => [`question-${q.id}`, ""])),
          ...JSON.parse(localStorage.getItem("quizAnswers") || "{}"), // Load saved answers
        }
      : {},
  });

  // Load saved answers on component mount
  useEffect(() => {
    if (isClient) {
      const savedAnswers = JSON.parse(
        localStorage.getItem("quizAnswers") || "{}"
      );
      Object.entries(savedAnswers).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [isClient, setValue]);

  // Save answers whenever they change
  const allAnswers = questions.map((q) => watch(`question-${q.id}`));

  useEffect(() => {
    if (isClient) {
      const answers = Object.fromEntries(
        questions.map((q) => [`question-${q.id}`, watch(`question-${q.id}`)])
      );
      // Only save if there are actual answers
      if (Object.values(answers).some((value) => value !== "")) {
        localStorage.setItem("quizAnswers", JSON.stringify(answers));
      }
    }
  }, [allAnswers, isClient, watch]);

  // Save other state to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("quizShowResults", JSON.stringify(showResults));
      localStorage.setItem(
        "quizCorrectAnswers",
        JSON.stringify(correctAnswers)
      );
      localStorage.setItem(
        "quizIncorrectAnswers",
        JSON.stringify(incorrectAnswers)
      );
    }
  }, [showResults, correctAnswers, incorrectAnswers, isClient]);

  const [mustComplete] = useState(false);

  // Remove unused mustComplete state
  const isAllQuestionsAnswered = allAnswers.every((answer) => answer !== "");
  console.log(questions)

  const onSubmit = () => {
    if (mustComplete) {
      if (isAllQuestionsAnswered) {
        let correct = 0;
        let incorrect = 0;
        questions.forEach((question) => {
          const userAnswer = watch(`question-${question.id}`);
          if (userAnswer === question.correctAnswer && userAnswer !== "") {
            correct++;
          } else {
            incorrect++;
          }
        });
        setCorrectAnswers(correct);
        setIncorrectAnswers(incorrect);
        setShowResults(true);

        // Save answers immediately on submit
        const answers = Object.fromEntries(
          questions.map((q) => [`question-${q.id}`, watch(`question-${q.id}`)])
        );
        localStorage.setItem("quizAnswers", JSON.stringify(answers));
      } else {
        toast.error("الرجاء الإجابة على جميع الأسئلة قبل الإرسال");
      }
    } else {
      let correct = 0;
      let incorrect = 0;
      questions.forEach((question) => {
        const userAnswer = watch(`question-${question.id}`);
        if (userAnswer === question.correctAnswer && userAnswer !== "") {
          correct++;
        } else if ( userAnswer !== "") {
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

  // Update reset functionality
  const resetQuiz = () => {
    setShowResults(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    questions.forEach((q) => setValue(`question-${q.id}`, ""));
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("quizShowResults");
    localStorage.removeItem("quizCorrectAnswers");
    localStorage.removeItem("quizIncorrectAnswers");
  };

  // Render loading state or null while client-side code is hydrating
  if (!isClient) {
    return null;
  }

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
        أختبار أحياء
        <div className="flex items-center justify-center gap-2">
          <Badge variant="default" className="text-base">
            صف ثاني ثانوي
          </Badge>
          <Badge variant="default" className="text-base">
            محاكي 
          </Badge>
        </div>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-wrap gap-2 mb-8"
      >
        <Badge variant="secondary" className="text-sm">
          ثانوية زهير بن قيس
        </Badge>
        <Badge variant="secondary" className="text-sm">
          المعلم: عبدالخالق جبره
        </Badge>
        <Badge variant="secondary" className="text-sm">
          عدد الأسئلة: {questions.length}
        </Badge>

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
                <div className="flex items-center flex-wrap gap-2 ">
                  {" "}
                  <Badge
                    className={`bg-green-500 dark:bg-green-600 hover:bg-green-600 hover:opacity-90 text-white transition-all`}
                    variant={"default"}
                    dir="rtl"
                  >
                    <p>
                      الإجابات الصحيحة: {savedAnswers.length}/{correctAnswers}
                    </p>
                  </Badge>
                  <Badge
                    className={`bg-red-500 dark:bg-red-600 hover:bg-red-600 hover:opacity-90 text-white transition-all`}
                    variant={"default"}
                    dir="rtl"
                  >
                    <p>
                      الإجابات الخاطئة: {savedAnswers.length}/{incorrectAnswers}
                    </p>
                  </Badge>
                  <Badge variant={"default"} dir="rtl">
                    <p>
                      الأسئلة المتبقية: {questions.length}/
                      {questions.length - savedAnswers.length}
                    </p>
                  </Badge>
                </div>
                <p>
                  النسبة المئوية للإجابات الصحيحة:{" "}
                  <span className="font-bold">
                    {((correctAnswers / savedAnswers.length) * 100).toFixed(2)}%
                  </span>
                </p>
              </CardContent>
            </Card>
            {questions.map((question) => {
              const userAnswer = watch(`question-${question.id}`);
              const isCorrect = userAnswer === question.correctAnswer;
              if (userAnswer) {
                return (
                  <Card key={question.id} className="mb-4">
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
                        <span className="font-bold">
                          {userAnswer || "لم تجب"}{" "}
                        </span>
                      </p>
                      <p>
                        الإجابة الصحيحة:{" "}
                        <span className="font-bold">
                          {question.correctAnswer}{" "}
                        </span>
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
                );
              }
              return null;
            })}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="sm:text-sm text-xs text-center text-muted-foreground">
            ملاحظة: جميع الاسئلة من{" "}
            <a
              href="https://t.me/+4y8IfXOZvpwzY2Q8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-black dark:text-white underline cursor-pointer">
                قروب تيليجرام احياء 2  ثاني ثانوي أ. عبدالخالق جبره
              </span>
            </a>{" "}
            <br />
            تم جمع الاسئلة بواسطة الذكاء الاصطناعي وأيضا الإجابات الصحيحة 
            فربما تحتمل نسبة خطأ! 
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
                <Button onClick={resetQuiz} className="w-full">
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
