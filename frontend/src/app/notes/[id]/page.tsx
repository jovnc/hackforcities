import { getNoteById } from "@/actions/notes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotePage({ params }: {params: Promise<{id: string}>}) {
  const id = (await params).id as string;
  const note = await getNoteById(id);

  if (!note) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 p-8 text-black dark:text-white">Note not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">{note.title}</h1>
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">Level: {note.level}</p>
        <p className="text-gray-600 dark:text-gray-400">Subject: {note.subject}</p>
      </div>
      <div className="mb-6">
      
      </div>
      <div className="mt-6">

        <Button variant="outline" className="border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
          <Link href="/notes">Back to Notes</Link>
        </Button>
      </div>
    </div>
  );
}

