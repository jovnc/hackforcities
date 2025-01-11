import { getNoteById } from "@/actions/notes";
import ChatWithNotes from "@/components/notes/ChatWithNotes";
import LevelTag from "@/components/notes/LevelTag";
import PDFViewer from "@/components/notes/PDFViewer";
import SubjectTag from "@/components/notes/SubjectTag";
import { Button } from "@/components/ui/button";
import { Level, Subject } from "@/types/notes";
import Link from "next/link";

export default async function NotePage({ params }: {params: Promise<{id: string}>}) {
  const id = (await params).id as string;
  const note = await getNoteById(id);

  if (!note) {
    return <div className="flex items-center justify-center h-full">
      <p className="font-bold">Note not found</p></div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col p-8 gap-4">
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
            {note.title}
          </h1>
            <p className="text-muted-foreground text-xs">Uploaded: {note.createdAt.toISOString()}</p>
          <div className="flex gap-2 mb-4">
            <LevelTag level={note.level as Level} />
            <SubjectTag subject={note.subject as Subject} />
          </div>
        </div>
        <div className="p-8">
          <Button variant="outline">
            <Link href="/notes">Back to Notes</Link>
          </Button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 bg-primary-foreground p-4">
        <PDFViewer url={note.link} />
        <ChatWithNotes id={note.id}/>
      </div>

    </div>
  );
}

