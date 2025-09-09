import { Question } from "./utils";

export const questions: Question[] = (() => {
  const generatedQuestions: Question[] = [];
  let runningId = 1;

  const shuffle = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const buildOptions = (correct: number, a: number, b: number): string[] => {
    const optionValues = new Set<number>();
    optionValues.add(correct);

    const candidates = [
      correct + a,
      correct - a,
      correct + b,
      correct - b,
      correct + (a + b),
      correct - (a + b),
    ];

    for (const value of candidates) {
      if (value > 0) optionValues.add(value);
      if (optionValues.size >= 4) break;
    }

    let delta = 2;
    while (optionValues.size < 4) {
      optionValues.add(correct + delta);
      if (optionValues.size >= 4) break;
      if (correct - delta > 0) optionValues.add(correct - delta);
      delta += 1;
    }

    return shuffle(Array.from(optionValues)).map(String);
  };

  const numberNameMap: Record<number, string> = {
    1: "الواحد",
    2: "الاثنين",
    3: "الثلاثة",
    4: "الأربعة",
    5: "الخمسة",
    6: "الستة",
    7: "السبعة",
    8: "الثمانية",
    9: "التسعة",
    10: "العشرة",
    11: "الأحد عشر",
    12: "الاثنا عشر",
    13: "الثلاثة عشر",
  };

  for (let a = 1; a <= 13; a++) {
    for (let b = 1; b <= 13; b++) {
      const correct = a * b;
      generatedQuestions.push({
        id: runningId,
        text: `${a} × ${b} = ?`,
        options: buildOptions(correct, a, b),
        correctAnswer: String(correct),
        type: "question",
        ...(b === 1
          ? {
              intro: {
                text: `جدول ضرب ${numberNameMap[a]}`,
                type: "intro",
                imageURL: "/assets/photos/math.webp"
              },
            }
          : {}),
      });
      runningId += 1;
    }
  }

  return generatedQuestions;
})();
