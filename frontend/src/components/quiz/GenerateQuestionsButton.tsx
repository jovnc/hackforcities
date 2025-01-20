'use client';
import React from 'react';
import { Button } from '../ui/button';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Spinner from '../ui/spinner';
import { api } from '@/lib/axios';

import { toast } from 'sonner';
import { Quiz } from '@/types/quiz';
import { MCQQuizDialog } from './MCQQuiz';
import QuizLoading from './QuizLoading';

export default function GenerateQuestionsButton({
  id,
  title,
  level,
}: {
  id: string;
  title: string;
  level: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState<null | Quiz[]>(null);

  const handleClick = async () => {
    setOpen(true);
    if (questions) return;
    try {
      const res = await api.post('/generate', {
        id: id,
        title,
        level,
      });
      const data = JSON.parse(res.data.message);

      setQuestions(data);
    } catch (error) {
      toast('An error occurred while generating questions');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={handleClick}>
        Generate Questions
      </Button>

      {questions ? <MCQQuizDialog quizQuestions={questions} setOpen={setOpen} /> : <QuizLoading />}
    </Dialog>
  );
}
