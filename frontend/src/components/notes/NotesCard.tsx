import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoteCardProps } from "@/types/notes";

export function NoteCard({ id, title, level, subject, link }: NoteCardProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">Level: {level}</p>
      <p className="text-gray-600 dark:text-gray-400">Subject: {subject}</p>
      <div className="mt-4">
        <Button variant="outline" className="mr-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
          <Link href={`/notes/${id}`}>View</Link>
        </Button>
    
      </div>
    </div>
  );
}

