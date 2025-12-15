"use client";

// metadata is provided in app/head.tsx for this client page
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Github } from "lucide-react";
import { questions_chapter_6 as biologySixthQuestions } from "@/lib/biology-questions";
import { questions_chapter_7 as biologySeventhQuestions } from "@/lib/biology-questions";

export default function Component() {
  const cards = [
    {
      title: "اختبار الأحياء الفصل السادس" ,
      href: "/biology-sim/chapter/sixth",
      description: "الدروس: خلايا النبات وانسجته, هرمونات النباتات واستجاباتها",
      count: biologySixthQuestions.length,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
    },
    {
      title: "اختبار الأحياء الفصل السابع" ,
      href: "/biology-sim/chapter/seventh",
      description: "الدروس:  الازهار, النباتات الزهرية",
      count: biologySeventhQuestions.length,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
    },
  ];

  return (
    <div className="container mx-auto py-24 pb-32 max-w-screen-md p-4" dir="rtl">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-2 sm:flex-row flex flex-col items-center justify-center gap-2"
      >
اختبار الاحياء الفترة الثانية
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-wrap gap-2 mb-8"
      >
        <Badge variant="secondary" className="text-sm">
        اختر الفصل وابدء الاختبار  
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant="secondary">{item.count} سؤال</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  {item.badges.map((b) => (
                    <Badge key={b} variant="outline" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>
                <Link href={item.href} className="w-full">
                  <Button className="w-full">بدء الاختبار</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

    
    </div>
  );
}
