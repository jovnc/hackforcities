import { Subject } from '@/types/notes';
import React from 'react'

const subjectToColor: Record<Subject, string> = {
    English: 'bg-purple-200 dark:bg-purple-600',
    Math: 'bg-amber-200 dark:bg-amber-600',
    Science: 'bg-pink-200 dark:bg-pink-600',
  };

const SubjectTag = ({ subject }: { subject: Subject}) => {
    const bgColor = subjectToColor[subject] || 'bg-gray-300'; // Fallback color if level is not found
    return (
      <p className={`${bgColor} rounded-lg w-fit px-3 py-1 transition-transform transform hover:scale-110 text-sm font-semibold border border-gray-300`}>
        {subject}
      </p>
    );
}

export default SubjectTag
