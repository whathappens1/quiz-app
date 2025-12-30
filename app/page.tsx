"use client";

// metadata is provided in app/head.tsx for this client page
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Github } from "lucide-react";

import { questions_chapter_9 as biologyNinthQuestions } from "@/lib/biology-questions";
import { questions_chapter_8 as biologyEighthQuestions } from "@/lib/biology-questions";
import { questions_chapter_7 as biologySeventhQuestions } from "@/lib/biology-questions";
import { questions_chapter_6 as biologySixthQuestions } from "@/lib/biology-questions";
import { questions_chapter_5 as biologyFifthQuestions } from "@/lib/biology-questions";
import { questions_chapter_4 as biologyFourthQuestions } from "@/lib/biology-questions";
import { questions_chapter_3 as biologyThirdQuestions } from "@/lib/biology-questions";
import { questions_chapter_2 as biologySecondQuestions } from "@/lib/biology-questions";
import { questions_chapter_1 as biologyFirstQuestions } from "@/lib/biology-questions";

import { questions as multiplicationQuestions } from "@/lib/multiplication-questions";

export default function Component() {
  const TotalBioQuestionsCount =
    biologyFirstQuestions.length +
    biologySecondQuestions.length +
    biologyThirdQuestions.length +
    biologyFifthQuestions.length +
    biologyFourthQuestions.length +
    biologySeventhQuestions.length +
    biologySixthQuestions.length +
    biologyEighthQuestions.length +
    biologyNinthQuestions.length;

  const cards = [
    {
      title: "محاكي اختبار الأحياء",
      href: "/biology-sim",
      description: "من الفصل الأول حتى الفصل السابع",
      count: TotalBioQuestionsCount,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
    },
    {
      title: "محاكي جدول الضرب 1-13",
      href: "/multiplication-sim",
      description:
        "تدريب على حفظ جدول الضرب مع اختيارات متعددة  مع واجهة تفاعلية ونتائج فورية. ",
      count: multiplicationQuestions.length,
      badges: ["رياضيات", "1-13", "مخصص"],
    },
  ];

  return (
    <div
      className="container mx-auto py-24 pb-32 max-w-screen-md p-4"
      dir="rtl"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-2 sm:flex-row flex flex-col items-center justify-center gap-2"
      >
        الصفحة الرئيسية
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-wrap gap-2 mb-8"
      >
        <Badge variant="secondary" className="text-sm">
          اختر المحاكي المناسب وابدأ الآن
        </Badge>
        <div className="flex items-center gap-2 justify-center">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card className="h-full py-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant="secondary">{item.count} سؤال</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  {item.badges.map((b) => (
                    <Badge key={b} variant="outline" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>
                <Link href={item.href} className="w-full">
                  <Button className="w-full">
                    {" "}
                    {item.href == "/biology-sim"
                      ? "اختر الفصل"
                      : "بدء الأختبار"}{" "}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
