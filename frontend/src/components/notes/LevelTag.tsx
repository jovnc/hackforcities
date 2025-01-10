import { Level } from '@/types/notes';
import React from 'react'

const levelToColor: Record<Level, string> = {
  P1: 'bg-red-300',
  P2: 'bg-yellow-300',
  P3: 'bg-green-300',
  P4: 'bg-blue-300',
  P5: 'bg-cyan-300',
  P6: 'bg-indigo-300',
};
  
  const LevelTag = ({ level }: { level: Level }) => {
    const bgColor = levelToColor[level] || 'bg-gray-300'; // Fallback color if level is not found
    return (
      <p className={`${bgColor} rounded-3xl w-fit px-3`}>
        {level}
      </p>
    );
  };
  
  export default LevelTag;