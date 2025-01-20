import React from 'react';
import Feedback from '../feedback/Feedback';

export default function SummaryComponent({ summary }: { summary: string }) {
  return (
    <div className="flex flex-col items-center gap-8 rounded-lg p-4">
      <p className="text-sm">{summary}</p>
      <Feedback />
    </div>
  );
}
