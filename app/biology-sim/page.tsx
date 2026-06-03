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

export default function Component() {
  const cards = [
    {
      title: "الباب الأول: الجهازان الهيكلي والعضلي",
      href: "/biology-sim/unit-1",
      count: 25,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "الجهاز الهيكلي والجهاز العضلي",
    },
    {
      title: "الباب الثاني: الجهاز العصبي",
      href: "/biology-sim/unit-2",
      count: 40,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "تركيب الجهاز العصبي وتنظيمه وتأثير العقاقير",
    },
    {
      title: "الباب الثالث: أجهزة الدوران والتنفس والإخراج",
      href: "/biology-sim/unit-3",
      count: 25,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "جهاز الدوران والجهاز التنفسي والجهاز الإخراجي",
    },
    {
      title: "الباب الرابع: جهاز الهضم والغدد الصم",
      href: "/biology-sim/unit-4",
      count: 39,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "الجهاز الهضمي والتغذية وجهاز الغدد الصم",
    },
    {
      title: "الباب الخامس: التكاثر والنمو في الإنسان",
      href: "/biology-sim/unit-5",
      count: 20,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "جهاز التكاثر في الإنسان ومراحل نمو الجنين",
    },
    {
      title: "الباب السادس: جهاز المناعة",
      href: "/biology-sim/unit-6",
      count: 12,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "جهاز المناعة والمناعة المتخصصة وغير المتخصصة",
    },
    {
      title: "الباب السابع: التكاثر الخلوي",
      href: "/biology-sim/unit-7",
      count: 36,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "النمو الخلوي والانقسام المتساوي وتنظيم دورة الخلية",
    },
    {
      title: "الباب الثامن: التكاثر الجنسي والوراثة",
      href: "/biology-sim/unit-8",
      count: 29,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "الانقسام المنصف والوراثة المندلية وارتباط الجينات",
    },
    {
      title: "الباب التاسع: الوراثة المعقدة والوراثة البشرية",
      href: "/biology-sim/unit-9",
      count: 41,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "الأنماط الأساسية والمعقدة لوراثة الإنسان والكروموسومات",
    },
    {
      title: "الباب العاشر: الوراثة الجزيئية",
      href: "/biology-sim/unit-10",
      count: 26,
      badges: ["ثاني ثانوي", "أحياء", "عبدالخالق جبره"],
      description: "المادة الوراثية DNA وتضاعفها و RNA والبروتين والطفرات",
    },
  ];

  return (
    <div className="container mx-auto py-24 pb-32 max-w-screen-xl p-4" dir="rtl">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-2 sm:flex-row flex flex-col items-center justify-center gap-2"
      >
        محاكي نهائي لاختبار الأحياء <Image src="/assets/bio-jbrah-logo.png" alt="biology-logo" className="dark:invert invert-0" width={100} height={100} />
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm text-center text-muted-foreground mb-4"
      >
        هذا الاختبار يأخذ أهم الأسئلة من أوراق عمل مادة الأحياء للتدريب على الاختبار النهائي ومقسمة على كل وحدة{" "}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-wrap gap-2 mb-8"
      >
        <Badge variant="secondary" className="text-sm">
        اختر الفصل وابدء الاختبار  
        </Badge>
        <Badge variant="secondary" className="text-sm cursor-pointer">
          ثانوية زهير بن قيس
        </Badge>
        <Badge variant="secondary" className="text-sm cursor-pointer">
          المعلم: عبدالخالق جبره
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

      <div className="grid grid-cols-1 sm:grid-cols-3  gap-4">
        {cards.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card className="h-full py-3 w-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <Badge variant="secondary">{item.count} سؤال</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">{item.description}</p>
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
