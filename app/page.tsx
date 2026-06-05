"use client";

// metadata is provided in app/head.tsx for this client page
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Github } from "lucide-react";
import Image from "next/image";
import { questions_summary } from "@/lib/biology-questions";

export default function Component() {
  const cards = [
    {
      title: "محاكي اختبار الأحياء من",
      href: "/biology-sim",
      description: "هذا الاختبار يأخذ أهم الأسئلة من أوراق عمل مادة الأحياء للتدريب على الاختبار النهائي ومقسمة على كل وحدة",

      count: questions_summary.length,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
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

      <div className="flex gap-4 justify-center items-center">
        {cards.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card className="h-full py-3 sm:w-[380px] w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">{item.title} <Image src="/assets/bio-jbrah-logo.png" alt="biology-logo" className="dark:invert invert-0" width={50} height={50} /></CardTitle>
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
