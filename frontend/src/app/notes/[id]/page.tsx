import { getNoteById } from '@/actions/notes';
import ChatWithNotes from '@/components/notes/ChatWithNotes';
import GenerateQuestionsButton from '@/components/notes/GenerateQuestionsButton';
import GenerateSummaryButton from '@/components/notes/GenerateSummaryButton';
import LevelTag from '@/components/notes/LevelTag';
import PDFViewer from '@/components/notes/PDFViewer';
import SubjectTag from '@/components/notes/SubjectTag';
import { Button } from '@/components/ui/button';
import { Level, Subject } from '@/types/notes';
import Link from 'next/link';

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id as string;
  const note = await getNoteById(id);

  if (!note) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-bold">Note not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 p-8">
          <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">{note.title}</h1>
          <p className="text-xs text-muted-foreground">Uploaded: {note.createdAt.toISOString()}</p>
          <div className="mb-4 flex gap-2">
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

      <div className="flex items-center justify-center gap-4 p-4">
        <GenerateSummaryButton id={note.id} />
        <GenerateQuestionsButton id={note.id} />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 bg-primary-foreground p-4 md:grid-cols-2">
        <PDFViewer url={note.link} />
        <ChatWithNotes id={note.id} />
      </div>
    </div>
  );
}
