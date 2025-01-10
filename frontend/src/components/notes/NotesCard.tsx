import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoteCardProps } from "@/types/notes";
import LevelTag from "./LevelTag";
import SubjectTag from "./SubjectTag";

export function NoteCard({ id, title, level, subject, link }: NoteCardProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 border-l-4 border-l-gray-300 border-b-4 border-b-gray-300 p-4 rounded-lg transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">{title}</h2>
      <div className="flex gap-x-2">
      <LevelTag level={level} />
      <SubjectTag subject={subject}/>
      </div>
      <div className="mt-4">
        <Button variant="outline" className="mr-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
          <Link href={`/notes/${id}`}>View</Link>
        </Button>
    
      </div>
    </div>
  );
}

