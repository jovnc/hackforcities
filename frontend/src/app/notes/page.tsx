import NotesFilter from "@/components/notes/NotesFilter";
import { getAllNotes } from "@/actions/notes";

export default async function NotesPage() {
  const notes = await getAllNotes();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 flex flex-col gap-y-6">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Uploaded Notes</h1>
      <NotesFilter notes={notes}/>
    </div>
  );
}

