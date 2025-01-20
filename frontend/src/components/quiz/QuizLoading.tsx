import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Spinner from '../ui/spinner';

export default function QuizLoading() {
  return (
    <DialogContent className="w-full">
      <DialogTitle></DialogTitle>
      <div className="flex w-3/4 items-center justify-between">
        <DialogHeader className="font-bold">MCQ Quiz</DialogHeader>
      </div>
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    </DialogContent>
  );
}
