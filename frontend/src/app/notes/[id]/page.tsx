import { getNoteById } from "@/actions/notes";
import ChatWithNotes from "@/components/notes/ChatWithNotes";
import PDFViewer from "@/components/notes/PDFViewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotePage({ params }: {params: Promise<{id: string}>}) {
  const id = (await params).id as string;
  const note = await getNoteById(id);

  if (!note) {
    return <div className="min-h-screen">Note not found</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col p-8">
          <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
            {note.title}
          </h1>
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400">Level: {note.level}</p>
            <p className="text-gray-600 dark:text-gray-400">Subject: {note.subject}</p>
          </div>
        </div>
        <div className="p-8">
          <Button variant="outline">
            <Link href="/notes">Back to Notes</Link>
          </Button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 bg-primary-foreground p-4">
        <ChatWithNotes id={note.id}/>
        <PDFViewer url={note.link} />
      </div>

    </div>
  );
}

