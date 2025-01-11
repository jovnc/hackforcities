import NotesFilter from "@/components/notes/NotesFilter";
import { getAllNotes } from "@/actions/notes";
import { Level, Subject } from "@/types/notes";

export default async function NotesPage() {
  const notes = await getAllNotes();
  const updatedNotes = notes.map(note => ({
    ...note,
    level: note.level as Level,
    subject: note.subject as Subject
  }));

  return (
    <div className="p-8 flex flex-col gap-y-6">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Uploaded Notes</h1>
      <NotesFilter notes={updatedNotes}/>
    </div>
  );
}

