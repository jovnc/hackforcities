'use client';
import React from 'react';
import { Button } from '../ui/button';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Spinner from '../ui/spinner';
import { api } from '@/lib/axios';

import { toast } from 'sonner';

export default function GenerateQuestionsButton({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const [summary, setSummary] = React.useState(null);

  const handleClick = async () => {
    // AI-Generated Summary of Notes
    setOpen(true);
    try {
      const res = await api.post('/generate', {
        message: 'help me generate 5 MCQ, provide answers too.',
        id: id,
      });
      setSummary(res.data.message);
    } catch (error) {
      toast('An error occurred while generating questions');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={handleClick}>
        Generate Questions
      </Button>
      <DialogContent className="w-full">
        <DialogTitle></DialogTitle>
        <div className="flex w-3/4 items-center justify-between">
          <DialogHeader className="font-bold">Questions</DialogHeader>
        </div>
        {summary ? (
          <div className="prose dark:prose-invert text-ellipsis whitespace-pre-wrap break-words text-xs">
            {summary}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
