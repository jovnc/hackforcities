'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Quiz } from '@/types/quiz';
import Feedback from '../feedback/Feedback';

export function MCQQuizDialog({
  quizQuestions,
  setOpen,
}: {
  quizQuestions: Quiz[];
  setOpen: (open: boolean) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    if (answerIndex === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setOpen(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setQuizCompleted(false);
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>MCQ Quiz</DialogTitle>
          {!quizCompleted && (
            <DialogDescription>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </DialogDescription>
          )}
        </DialogHeader>
        {!quizCompleted ? (
          <div className="py-4">
            <h3 className="mb-4 text-lg font-medium">{quizQuestions[currentQuestion].question}</h3>
            <div className="space-y-2">
              {quizQuestions[currentQuestion].choices.map((choice, index) => (
                <Button
                  key={index}
                  className="w-full justify-start text-left"
                  variant={
                    selectedAnswer === index
                      ? index === quizQuestions[currentQuestion].answer
                        ? 'success'
                        : 'destructive'
                      : 'outline'
                  }
                  onClick={() => handleAnswer(index)}
                  disabled={showAnswer}
                >
                  {choice}
                </Button>
              ))}
            </div>
            {showAnswer && selectedAnswer !== quizQuestions[currentQuestion].answer && (
              <div className="flex flex-col gap-4">
                <p className="mt-4 text-sm text-red-500">
                  Correct answer:{' '}
                  {quizQuestions[currentQuestion].choices[quizQuestions[currentQuestion].answer]}
                </p>
                <Feedback />
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 text-center">
            <h3 className="mb-4 text-2xl font-bold">Quiz Completed!</h3>
            <p className="text-lg">Your final score is:</p>
            <p className="mt-2 text-3xl font-bold text-primary">
              {score}/{quizQuestions.length}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {score === quizQuestions.length
                ? 'Congratulations! Perfect score!'
                : score >= quizQuestions.length / 2
                  ? 'Good job! You passed the quiz.'
                  : 'Keep practicing. You can do better!'}
            </p>
          </div>
        )}
        <DialogFooter>
          <div className="flex w-full justify-between">
            {!quizCompleted ? (
              <>
                <p className="text-sm text-gray-500">
                  Score: {score}/{quizQuestions.length}
                </p>
                <Button onClick={nextQuestion}>
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={resetQuiz}>
                Restart Quiz
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
