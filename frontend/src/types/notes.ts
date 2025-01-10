export interface NoteCardProps {
    id: number;
    name: string;
    level: Level;
    subject: Subject;
    link: string;
  }
  
export type Level = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
export type Subject = 'Math' | 'Science' | 'English';