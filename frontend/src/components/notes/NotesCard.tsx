import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoteCardProps } from "@/types/notes";
import LevelTag from "./LevelTag";
import SubjectTag from "./SubjectTag";

export function NoteCard({ id, title, level, subject, link }: NoteCardProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 border-l-4 border-l-gray-300 border-b-4 border-b-gray-300 p-4 rounded-lg transition-transform transform hover:scale-105">
      <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">{title}</h2>
      <div className="flex gap-x-2">
      </div>
      <div className="mt-4 flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/notes/${id}`}>View</Link>
        </Button>
        <div className="flex gap-2 items-center">
          <LevelTag level={level} />
          <SubjectTag subject={subject}/>
        </div>
      </div>
    </div>
  );
}

