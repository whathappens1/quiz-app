"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { questions } from "@/lib/multiplication-questions";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CircleAlert, Github } from "lucide-react";
import QuestionCard from "@/app/components/layouts/question-card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function MultiplicationForm() {
  // Add state to track if we're on client side
  const [isClient, setIsClient] = useState(false);
  const [selectedTables, setSelectedTables] = useState<number[]>(
    Array.from({ length: 13 }, (_, i) => i + 1)
  );
  const [isRandomOrder, setIsRandomOrder] = useState<boolean>(false);
  const [shuffledIds, setShuffledIds] = useState<number[] | null>(null);
  // legacy state removed

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize state with undefined first, then update from localStorage
  const [showResults, setShowResults] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mathQuizShowResults");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [correctAnswers, setCorrectAnswers] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mathQuizCorrectAnswers");
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });

  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mathQuizIncorrectAnswers");
      return saved ? JSON.parse(saved) : 0;
    }
    return 0;
  });

  // Get saved answers array for calculations
  const savedAnswers = isClient
    ? Object.values(
        JSON.parse(localStorage.getItem("mathQuizAnswers") || "{}")
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
          ...JSON.parse(localStorage.getItem("mathQuizAnswers") || "{}"), // Load saved answers
        }
      : {},
  });

  // Load saved answers on component mount
  useEffect(() => {
    if (isClient) {
      const savedAnswers = JSON.parse(
        localStorage.getItem("mathQuizAnswers") || "{}"
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
        localStorage.setItem("mathQuizAnswers", JSON.stringify(answers));
      }
    }
  }, [allAnswers, isClient, watch]);

  // Save other state to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("mathQuizShowResults", JSON.stringify(showResults));
      localStorage.setItem(
        "mathQuizCorrectAnswers",
        JSON.stringify(correctAnswers)
      );
      localStorage.setItem(
        "mathQuizIncorrectAnswers",
        JSON.stringify(incorrectAnswers)
      );
    }
  }, [showResults, correctAnswers, incorrectAnswers, isClient]);

  const [mustComplete] = useState(false);

  // Remove unused mustComplete state
  const isAllQuestionsAnswered = allAnswers.every((answer) => answer !== "");

  const toggleTable = (table: number) => {
    setSelectedTables((prev) =>
      prev.includes(table)
        ? prev.filter((t) => t !== table)
        : [...prev, table].sort((a, b) => a - b)
    );
  };

  const selectAllTables = () =>
    setSelectedTables(Array.from({ length: 13 }, (_, i) => i + 1));
  const clearAllTables = () => setSelectedTables([]);
  const filteredQuestions = questions.filter((q) => {
    // q.text pattern: "a × b = ?"
    const aString = q.text.split("×")[0].trim();
    const multiplicand = parseInt(aString, 10);
    return selectedTables.includes(multiplicand);
  });

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
        if (!shuffledIds) return filteredQuestions;
        const byId = new Map(filteredQuestions.map((q) => [q.id, q] as const));
        return shuffledIds
          .map((id) => byId.get(id))
          .filter((q): q is typeof filteredQuestions[number] => Boolean(q));
      })()
    : filteredQuestions;

  // Build a stable shuffled order when random mode is toggled or the pool changes
  useEffect(() => {
    if (isRandomOrder) {
      const ids = filteredQuestions.map((q) => q.id);
      setShuffledIds(shuffleArray(ids));
    } else {
      setShuffledIds(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRandomOrder, selectedTables]);

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
        localStorage.setItem("mathQuizAnswers", JSON.stringify(answers));
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

  // Update reset functionality
  const resetmathQuiz = () => {
    setShowResults(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    questions.forEach((q) => setValue(`question-${q.id}`, ""));
    localStorage.removeItem("mathQuizAnswers");
    localStorage.removeItem("mathQuizShowResults");
    localStorage.removeItem("mathQuizCorrectAnswers");
    localStorage.removeItem("mathQuizIncorrectAnswers");
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
        اختبار جدول الضرب 1 - 13
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-wrap gap-2 mb-8"
      >
        <Badge variant="secondary" className="text-sm">
          عدد الأسئلة: {displayedQuestions.length}
        </Badge>

        <div className="flex items-center gap-2 justify-center">
          {/* Desktop/tablet filter (dropdown) */}
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={showResults}>اختيار جداول محددة</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <div dir="rtl">
                  <DropdownMenuLabel dir="rtl">جداول الضرب</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[...Array(13)].map((_, idx) => {
                    const num = idx + 1;
                    return (
                      <DropdownMenuCheckboxItem
                        key={num}
                        checked={selectedTables.includes(num)}
                        onCheckedChange={() => toggleTable(num)}
                      >
                        جدول {num}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      selectAllTables();
                    }}
                  >
                    تحديد الكل
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      clearAllTables();
                    }}
                  >
                    مسح التحديد
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Mobile filter (bottom sheet) */}
          <div className="sm:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" disabled={showResults}>اختيار جداول محددة</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div dir="rtl" className="mx-auto w-full px-4">
                  <DrawerHeader>
                    <DrawerTitle>جداول الضرب</DrawerTitle>
                    <DrawerDescription>
                      اختر الجداول التي تريد التدريب عليها
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="grid grid-cols-3 gap-2 py-3">
                    {[...Array(13)].map((_, idx) => {
                      const num = idx + 1;
                      const checked = selectedTables.includes(num);
                      return (
                        <Button
                          key={num}
                          variant={checked ? "default" : "outline"}
                          className="w-full"
                          onClick={() => toggleTable(num)}
                        >
                          جدول {num}
                        </Button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTables([]);
                      }}
                    >
                      مسح التحديد
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedTables(
                          Array.from({ length: 13 }, (_, i) => i + 1)
                        );
                      }}
                    >
                      تحديد الكل
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <Button
            variant={isRandomOrder ? "default" : "outline"}
            onClick={() => setIsRandomOrder((prev) => !prev)}
            disabled={showResults}
          >
            {isRandomOrder ? "إلغاء العشوائية" : "ترتيب عشوائي"}
          </Button>
          <ModeToggle />
          <a
            href="https://github.com/whathappens1/mathQuiz-app"
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
      {/* Replaced custom sheet with shadcn Sheet above */}
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.form
            key="mathQuiz-form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {displayedQuestions.length === 0 ? (
              <div className="flex-col justify-center items-center">
                <CircleAlert
                  strokeWidth={1}
                  className="w-16 h-16 text-center mx-auto mb-4"
                />
                <p className="text-center text-muted-foreground">
                  لا توجد أسئلة. يرجى اختيار جداول من الفلتر.
                </p>
              </div>
            ) : (
              displayedQuestions.map((question, idx) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(idx * 0.03, 0.3),
                  }}
                >
                  <QuestionCard
                    {...{ question, errors, watch, setValue }}
                    WithoutIntro={isRandomOrder}
                  />
                </motion.div>
              ))
            )}
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
            {displayedQuestions.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                لا توجد أسئلة. يرجى اختيار جداول من الفلتر.
              </div>
            ) : (
              displayedQuestions.map((question, idx) => {
                const userAnswer = watch(`question-${question.id}`);
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
              })
            )}
          </motion.div>
        )}
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
                <Button onClick={resetmathQuiz} className="w-full">
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
