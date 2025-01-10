import { NoteCardProps } from "@/types/notes";
import { NoteCard } from "./NotesCard";

export async function getNotes(): Promise<NoteCardProps[]> {
    // This would be replaced with an actual API call or database query
    return [
      { id: 1, name: "Algebra", level: "P5", subject: "Math", link: "https://drive.google.com/file/d/example1" },
      { id: 2, name: "Light", level: "P6", subject: "Science", link: "https://drive.google.com/file/d/example2" },
      { id: 3, name: "Conjuctions", level: "P4", subject: "English", link: "https://drive.google.com/file/d/example3" },
    ];
  }

import React from 'react'

 const Notes = ({notes} : {notes: NoteCardProps[]}) => {

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes && notes.map((note) => (
          <NoteCard key={note.id} {...note} />
        ))}
      </div>
  )
}

export default Notes
