import { Level } from '@/types/notes';
import React from 'react'

const levelToColor: Record<Level, string> = {
  P1: 'bg-red-200 dark:bg-red-600',
  P2: 'bg-yellow-200 dark:bg-yellow-600',
  P3: 'bg-green-200 dark:bg-green-600',
  P4: 'bg-blue-200 dark:bg-blue-600',
  P5: 'bg-cyan-200 dark:bg-cyan-600',
  P6: 'bg-indigo-200 dark:bg-indigo-600',
};
  
  const LevelTag = ({ level }: { level: Level }) => {
    const bgColor = levelToColor[level] || 'bg-gray-300'; // Fallback color if level is not found
    return (
      <p className={`${bgColor} rounded-lg w-fit px-3 py-1 transition-transform transform hover:scale-110 font-semibold border border-gray-300 text-sm `}>
        {level}
      </p>
    );
  };
  
  export default LevelTag;