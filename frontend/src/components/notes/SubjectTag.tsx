import { Subject } from '@/types/notes';
import React from 'react'

const subjectToColor: Record<Subject, string> = {
    English: 'bg-purple-300',
    Math: 'bg-amber-300',
    Science: 'bg-pink-300',
  };

const SubjectTag = ({ subject }: { subject: Subject}) => {
    const bgColor = subjectToColor[subject] || 'bg-gray-300'; // Fallback color if level is not found
    return (
      <p className={`${bgColor} rounded-3xl w-fit px-3`}>
        {subject}
      </p>
    );
}

export default SubjectTag
