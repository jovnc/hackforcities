import { Level } from '@/types/notes';
import React from 'react'

const levelToColor: Record<Level, string> = {
  P1: 'bg-red-200',
  P2: 'bg-yellow-200',
  P3: 'bg-green-200',
  P4: 'bg-blue-200',
  P5: 'bg-cyan-200',
  P6: 'bg-indigo-200',
};
  
  const LevelTag = ({ level }: { level: Level }) => {
    const bgColor = levelToColor[level] || 'bg-gray-300'; // Fallback color if level is not found
    return (
      <p className={`${bgColor} rounded-3xl w-fit px-3 transition-transform transform hover:scale-110`}>
        {level}
      </p>
    );
  };
  
  export default LevelTag;