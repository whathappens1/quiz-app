'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Question = {
  id: number
  text: string
  options: string[]
  correctAnswer: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "ما هي عاصمة فرنسا؟",
    options: ["لندن", "باريس", "روما", "مدريد"],
    correctAnswer: "باريس"
  },
]

export default function Component() {
  const [showResults, setShowResults] = useState(false)
  const { handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: Object.fromEntries(questions.map(q => [`question-${q.id}`, '']))
  });

  // Watch all question answers
  const allAnswers = questions.map(q => watch(`question-${q.id}`));
  
  // Check if all questions are answered
  const isAllQuestionsAnswered = allAnswers.every(answer => answer !== '');

  const onSubmit = (data: any) => {
    if (isAllQuestionsAnswered) {
      setShowResults(true);
    } else {
      alert('الرجاء الإجابة على جميع الأسئلة قبل الإرسال');
    }
  };

  const formVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 }
  }

  const resultsVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 }
  }

  return (
    <div className="container mx-auto py-8 max-w-screen-md p-4" dir='rtl'>
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-6"
      >
        تطبيق الأختبار السريع
      </motion.h1>
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
                    <CardTitle>{question.text}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                    dir='rtl'
                      defaultValue=""
                      onValueChange={(value) => setValue(`question-${question.id}`, value)}
                      value={watch(`question-${question.id}`)}
                    >
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <RadioGroupItem
                            value={option}
                            id={`q${question.id}-${index}`}
                          />
                          <Label htmlFor={`q${question.id}-${index}`}>{option}</Label>
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: questions.length * 0.1 }}
            >
              <Button 
                type="submit" 
                className="w-full"
                disabled={!isAllQuestionsAnswered}
              >
                {isAllQuestionsAnswered ? 'إرسال الإجابات' : 'الرجاء الإجابة على جميع الأسئلة'}
              </Button>
            </motion.div>
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
            {questions.map((question) => {
              const userAnswer = watch(`question-${question.id}`);
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <Card key={question.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{question.text}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>إجابتك: {userAnswer || 'لم تجب'}</p>
                    <p>الإجابة الصحيحة: {question.correctAnswer}</p>
                    <p className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                      {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
            <Button onClick={() => {
              setShowResults(false);
              questions.forEach(q => setValue(`question-${q.id}`, ''));
            }} className="w-full mt-4">
              إعادة الاختبار
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}