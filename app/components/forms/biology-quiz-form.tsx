"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Github } from "lucide-react";
import QuestionCard from "@/app/components/layouts/question-card";
import Image from "next/image";

export interface BiologyQuizFormProps {
  questions: Question[];
  // Unique key used to namespace this quiz's localStorage entries
  storagePrefix: string;
  title: string;
  lessonsLabel?: string;
}

export default function BiologyQuizForm({
  questions,
  storagePrefix,
  title,
  lessonsLabel = "جميع الدروس",
}: BiologyQuizFormProps) {
  const answersKey = `${storagePrefix}Answers`;
  const showResultsKey = `${storagePrefix}ShowResults`;
  const correctAnswersKey = `${storagePrefix}CorrectAnswers`;
  const incorrectAnswersKey = `${storagePrefix}IncorrectAnswers`;

  // Add state to track if we're on client side
  const [isClient, setIsClient] = useState(false);
  const [isRandomOrder, setIsRandomOrder] = useState<boolean>(false);
  const [shuffledIds, setShuffledIds] = useState<number[] | null>(null);

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize state with undefined first, then update from localStorage
  const [showResults, setShowResults] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(showResultsKey);
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [correctAnswers, setCorrectAnswers] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(correctAnswersKey);
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });

  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(incorrectAnswersKey);
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });

  const buildDefaultKeys = () => {
    const entries: [string, string][] = [];
    questions.forEach((q) => {
      entries.push([`question-${q.id}`, ""]);
      if (q.type === "match" && q.matchItems) {
        q.matchItems.forEach((_, idx) => {
          entries.push([`question-${q.id}-match-${idx}`, ""]);
        });
      }
    });
    return Object.fromEntries(entries);
  };

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: isClient
      ? {
          ...buildDefaultKeys(),
          ...JSON.parse(localStorage.getItem(answersKey) || "{}"),
        }
      : {},
  });

  // Load saved answers on component mount
  useEffect(() => {
    if (isClient) {
      const saved = JSON.parse(localStorage.getItem(answersKey) || "{}");
      Object.entries(saved).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [isClient, setValue, answersKey]);

  // Save answers whenever they change
  const allWatchKeys = questions.flatMap((q) => {
    const keys = [`question-${q.id}`];
    if (q.type === "match" && q.matchItems) {
      q.matchItems.forEach((_, idx) => {
        keys.push(`question-${q.id}-match-${idx}`);
      });
    }
    return keys;
  });
  const allAnswers = allWatchKeys.map((k) => watch(k));

  // Count answered questions (match = 1 question regardless of row count)
  let answeredCount = 0;
  if (isClient) {
    questions.forEach((q) => {
      if (q.type === "match" && q.matchItems) {
        const hasAny = q.matchItems.some((_, idx) => {
          const val = watch(`question-${q.id}-match-${idx}`) as string;
          return val && val !== "";
        });
        if (hasAny) answeredCount++;
      } else {
        const val = watch(`question-${q.id}`) as string;
        if (val && val !== "") answeredCount++;
      }
    });
  }

  useEffect(() => {
    if (isClient) {
      const answers = Object.fromEntries(
        allWatchKeys.map((k) => [k, watch(k)])
      );
      if (Object.values(answers).some((value) => value !== "")) {
        localStorage.setItem(answersKey, JSON.stringify(answers));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAnswers, isClient, answersKey]);

  // Save other state to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(showResultsKey, JSON.stringify(showResults));
      localStorage.setItem(correctAnswersKey, JSON.stringify(correctAnswers));
      localStorage.setItem(
        incorrectAnswersKey,
        JSON.stringify(incorrectAnswers)
      );
    }
  }, [
    showResults,
    correctAnswers,
    incorrectAnswers,
    isClient,
    showResultsKey,
    correctAnswersKey,
    incorrectAnswersKey,
  ]);

  const [mustComplete] = useState(false);

  const isAllQuestionsAnswered = allAnswers.every((answer) => answer !== "");

  const scoreQuestions = (requireAll: boolean) => {
    let correct = 0;
    let incorrect = 0;
    questions.forEach((question) => {
      if (question.type === "multiple") {
        const userAnswer = watch(`question-${question.id}`);
        if (requireAll) {
          if (userAnswer === question.correctAnswer && userAnswer !== "") {
            correct++;
          } else {
            incorrect++;
          }
        } else {
          if (userAnswer === question.correctAnswer && userAnswer !== "") {
            correct++;
          } else if (userAnswer !== "") {
            incorrect++;
          }
        }
      } else if (question.type === "match" && question.matchItems) {
        const hasAnyAnswer = question.matchItems.some((_, idx) => {
          const val = watch(`question-${question.id}-match-${idx}`) as string;
          return val && val !== "";
        });
        if (hasAnyAnswer || requireAll) {
          const allCorrect = question.matchItems.every((item, idx) => {
            const val = watch(`question-${question.id}-match-${idx}`) as string;
            return val === item.definition;
          });
          if (allCorrect) {
            correct++;
          } else {
            incorrect++;
          }
        }
      }
    });
    return { correct, incorrect };
  };

  const onSubmit = () => {
    if (mustComplete) {
      if (isAllQuestionsAnswered) {
        const { correct, incorrect } = scoreQuestions(true);
        setCorrectAnswers(correct);
        setIncorrectAnswers(incorrect);
        setShowResults(true);

        const answers = Object.fromEntries(
          allWatchKeys.map((k) => [k, watch(k)])
        );
        localStorage.setItem(answersKey, JSON.stringify(answers));
      } else {
        toast.error("الرجاء الإجابة على جميع الأسئلة قبل الإرسال");
      }
    } else {
      const { correct, incorrect } = scoreQuestions(false);
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

  const shuffleArray = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const displayedQuestions = isRandomOrder
    ? (() => {
        if (!shuffledIds) return questions;
        const byId = new Map(questions.map((q) => [q.id, q] as const));
        return shuffledIds
          .map((id) => byId.get(id))
          .filter((q): q is (typeof questions)[number] => Boolean(q));
      })()
    : questions;

  // Build a stable shuffled order when random toggles
  useEffect(() => {
    if (isRandomOrder) {
      const ids = questions.map((q) => q.id);
      setShuffledIds(shuffleArray(ids));
    } else {
      setShuffledIds(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRandomOrder]);

  // Update reset functionality
  const resetQuiz = () => {
    setShowResults(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    questions.forEach((q) => {
      setValue(`question-${q.id}`, "");
      if (q.type === "match" && q.matchItems) {
        q.matchItems.forEach((_, idx) => {
          setValue(`question-${q.id}-match-${idx}`, "");
        });
      }
    });
    localStorage.removeItem(answersKey);
    localStorage.removeItem(showResultsKey);
    localStorage.removeItem(correctAnswersKey);
    localStorage.removeItem(incorrectAnswersKey);
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
        <div className="flex items-center justify-center gap-2">
          {title}
        </div>

        <div className="flex items-center justify-center gap-2">
          <Badge variant="default" className="text-base">
            صف ثاني ثانوي
          </Badge>
          <Badge variant="default" className="text-base">
            محاكي
          </Badge>
        </div>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm text-center text-muted-foreground mb-4"
      >
        الدروس: {lessonsLabel}{" "}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-wrap gap-2 mb-8"
      >
        <Badge variant="secondary" className="text-sm cursor-pointer">
          ثانوية زهير بن قيس
        </Badge>
        <Badge variant="secondary" className="text-sm cursor-pointer">
          المعلم: عبدالخالق جبره
        </Badge>
        <Badge variant="secondary" className="text-sm cursor-pointer">
          عدد الأسئلة: {questions.length}
        </Badge>

        <div className="flex items-center gap-2 justify-center">
          <Button
            variant={isRandomOrder ? "default" : "outline"}
            onClick={() => setIsRandomOrder((prev) => !prev)}
            disabled={showResults}
          >
            {isRandomOrder ? "إلغاء العشوائية" : "ترتيب عشوائي"}
          </Button>
          <ModeToggle />
          <a
            href="https://github.com/qtamim/quiz-app"
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
            {displayedQuestions.map((question, idx) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
              >
                <QuestionCard
                  {...{ question, errors, watch, setValue }}
                  WithoutIntro={isRandomOrder}
                />
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
                      الإجابات الصحيحة: {answeredCount}/{correctAnswers}
                    </p>
                  </Badge>
                  <Badge
                    className={`bg-red-500 dark:bg-red-600 hover:bg-red-600 hover:opacity-90 text-white transition-all`}
                    variant={"default"}
                    dir="rtl"
                  >
                    <p>
                      الإجابات الخاطئة: {answeredCount}/{incorrectAnswers}
                    </p>
                  </Badge>
                  {/* <Badge variant={"default"} dir="ltr">
                    <p>
                      الأسئلة المتبقية: {questions.length}/
                      {(questions.length) - (incorrectAnswers + correctAnswers)}
                    </p>
                  </Badge> */}
                </div>
                <p>
                  النسبة المئوية للإجابات الصحيحة:{" "}
                  <span className="font-bold">
                    {answeredCount > 0
                      ? ((correctAnswers / answeredCount) * 100).toFixed(2)
                      : "0.00"}%
                  </span>
                </p>
              </CardContent>
            </Card>
            {displayedQuestions.map((question, idx) => {
              if (question.type === "match" && question.matchItems) {
                const hasAnyMatchAnswer = question.matchItems.some(
                  (_, mIdx) =>
                    watch(`question-${question.id}-match-${mIdx}`) as string
                );
                if (hasAnyMatchAnswer) {
                  return (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(idx * 0.02, 0.2),
                      }}
                    >
                      <QuestionCard
                        question={question}
                        isResult={true}
                        watch={watch}
                        WithoutIntro={isRandomOrder}
                      />
                    </motion.div>
                  );
                }
                return null;
              }

              const userAnswer = watch(`question-${question.id}`) as string;
              const isCorrect = userAnswer === question.correctAnswer;
              if (userAnswer) {
                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(idx * 0.02, 0.2),
                    }}
                  >
                    <QuestionCard
                      {...{ question, isCorrect, userAnswer }}
                      isResult={true}
                      WithoutIntro={isRandomOrder}
                    />
                  </motion.div>
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
        ملاحظة: جميع أسئلة المقالي لا يتم عرضها في النتائج و لايتم حسابها في صفحة النتائج!
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="border-t w-full fixed z-50 -bottom-1 mt-64 left-0 right-0 bg-background/70 backdrop-blur-md">
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
