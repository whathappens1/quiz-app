"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { questions_chapter_9 as questions } from "@/lib/biology-questions";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Github } from "lucide-react";
import QuestionCard from "@/app/components/layouts/question-card";

export default function BiologyChapter5Form() {
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
      const saved = localStorage.getItem("biologyQuizChapter9ShowResults");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [correctAnswers, setCorrectAnswers] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("biologyQuizChapter9CorrectAnswers");
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });

  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("biologyQuizChapter9IncorrectAnswers");
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });

  // Get saved answers array for calculations
  const savedAnswers = isClient
    ? Object.values(
        JSON.parse(localStorage.getItem("biologyQuizChapter9Answers") || "{}")
      ).filter((answer) => answer !== "")
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
          ...JSON.parse(localStorage.getItem("biologyQuizChapter9Answers") || "{}"), // Load saved answers
        }
      : {},
  });

  // Load saved answers on component mount
  useEffect(() => {
    if (isClient) {
      const savedAnswers = JSON.parse(
        localStorage.getItem("biologyQuizChapter9Answers") || "{}"
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
        localStorage.setItem("biologyQuizChapter9Answers", JSON.stringify(answers));
      }
    }
  }, [allAnswers, isClient, watch]);

  // Save other state to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(
        "biologyQuizChapter9ShowResults",
        JSON.stringify(showResults)
      );
      localStorage.setItem(
        "biologyQuizChapter9CorrectAnswers",
        JSON.stringify(correctAnswers)
      );
      localStorage.setItem(
        "biologyQuizChapter9IncorrectAnswers",
        JSON.stringify(incorrectAnswers)
      );
    }
  }, [showResults, correctAnswers, incorrectAnswers, isClient]);

  const [mustComplete] = useState(false);

  // Remove unused mustComplete state
  const isAllQuestionsAnswered = allAnswers.every((answer) => answer !== "");

  const onSubmit = () => {
    if (mustComplete) {
      if (isAllQuestionsAnswered) {
        let correct = 0;
        let incorrect = 0;
        questions.forEach((question) => {
       if (question.type == "question") {
            const userAnswer = watch(`question-${question.id}`);
            if (userAnswer === question.correctAnswer && userAnswer !== "") {
              correct++;
            } else {
              incorrect++;
            }
          }
        });
        setCorrectAnswers(correct);
        setIncorrectAnswers(incorrect);
        setShowResults(true);

        // Save answers immediately on submit
        const answers = Object.fromEntries(
          questions.map((q) => [`question-${q.id}`, watch(`question-${q.id}`)])
        );
        localStorage.setItem("biologyQuizChapter9Answers", JSON.stringify(answers));
      } else {
        toast.error("الرجاء الإجابة على جميع الأسئلة قبل الإرسال");
      }
    } else {
      let correct = 0;
      let incorrect = 0;
      questions.forEach((question) => {
         if (question.type == "question") {
            const userAnswer = watch(`question-${question.id}`);
            if (userAnswer === question.correctAnswer && userAnswer !== "") {
              correct++;
            } else {
              incorrect++;
            }
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
  const resetbiologyQuizChapter9 = () => {
    setShowResults(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    questions.forEach((q) => setValue(`question-${q.id}`, ""));
    localStorage.removeItem("biologyQuizChapter9Answers");
    localStorage.removeItem("biologyQuizChapter9ShowResults");
    localStorage.removeItem("biologyQuizChapter9CorrectAnswers");
    localStorage.removeItem("biologyQuizChapter9IncorrectAnswers");
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
         أختبار أحياء الفصل التاسع والأخير 
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
الدروس: كيف تحصل المخلوقات الحية على الطاقة, البناء الضوئي
      </motion.p>
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
            key="biologyQuizChapter9-form"
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
            {displayedQuestions.map((question, idx) => {
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
            ملاحظة: جميع الاسئلة من{" "}
            <a
              href="https://t.me/+4y8IfXOZvpwzY2Q8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-black dark:text-white underline cursor-pointer">
                قروب تيليجرام احياء 2 ثاني ثانوي أ. عبدالخالق جبره
              </span>
            </a>{" "}
            <br />
            تم جمع الاسئلة بواسطة الذكاء الاصطناعي وأيضا الإجابات الصحيحة فربما
            تحتمل نسبة خطأ!
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
                <Button onClick={resetbiologyQuizChapter9} className="w-full">
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
