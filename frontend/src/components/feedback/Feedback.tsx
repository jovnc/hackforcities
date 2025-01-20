'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Feedback() {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = (isPositive: boolean) => {
    setFeedback(isPositive ? 'positive' : 'negative');
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4 rounded-lg bg-gray-100 p-4">
      <p className="text-sm font-semibold text-gray-700">Was this AI response helpful?</p>
      <div className="flex space-x-4">
        <Button
          onClick={() => handleFeedback(true)}
          variant={feedback === 'positive' ? 'default' : 'outline'}
          size="lg"
          className={`transition-all duration-300 ${feedback === 'positive' ? 'bg-green-500 hover:bg-green-600' : ''}`}
        >
          <ThumbsUp className={`mr-2 h-5 w-5 ${feedback === 'positive' ? 'animate-bounce' : ''}`} />
          Yes
        </Button>
        <Button
          onClick={() => handleFeedback(false)}
          variant={feedback === 'negative' ? 'default' : 'outline'}
          size="lg"
          className={`transition-all duration-300 ${feedback === 'negative' ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          <ThumbsDown
            className={`mr-2 h-5 w-5 ${feedback === 'negative' ? 'animate-bounce' : ''}`}
          />
          No
        </Button>
      </div>
      {feedback && (
        <p className="animate-fade-in mt-2 text-sm text-gray-600">Thank you for your feedback!</p>
      )}
    </div>
  );
}
