'use client';
import React from 'react';
import { Button } from '../ui/button';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Spinner from '../ui/spinner';
import { api } from '@/lib/axios';

export default function GenerateSummaryButton({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const [summary, setSummary] = React.useState(null);

  const handleClick = async () => {
    // AI-Generated Summary of Notes
    setOpen(true);
    const res = await api.post('/chat', { message: 'what are these notes about?', id: id });
    const msg = res.data.message;
    setSummary(msg);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={handleClick}>
        Generate Summary
      </Button>
      <DialogContent className="w-3/4">
        <DialogTitle></DialogTitle>
        <DialogHeader className="font-bold">Summary</DialogHeader>
        {summary ? <p>{summary}</p> : <Spinner />}
      </DialogContent>
    </Dialog>
  );
}
