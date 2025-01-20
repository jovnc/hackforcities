'use client';
import React from 'react';
import { Button } from '../ui/button';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Spinner from '../ui/spinner';
import { api } from '@/lib/axios';
import { toast } from 'sonner';
import SummaryComponent from './SummaryComponent';

export default function GenerateSummaryButton({
  id,
  title,
  level,
}: {
  id: string;
  title: string;
  level: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [summary, setSummary] = React.useState(null);

  const handleClick = async () => {
    // AI-Generated Summary of Notes
    setOpen(true);
    try {
      const res = await api.post('/summary', {
        id: id,
        title: title,
        level: level,
      });
      const msg = res.data.message;
      setSummary(msg);
    } catch (error) {
      toast("Couldn't generate summary, document may still be processing");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={handleClick}>
        Generate Summary
      </Button>
      <DialogContent className="w-3/4">
        <DialogTitle></DialogTitle>
        <DialogHeader className="font-bold">Summary</DialogHeader>
        {summary ? (
          <SummaryComponent summary={summary} />
        ) : (
          <div className="flex w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
