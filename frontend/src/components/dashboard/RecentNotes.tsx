import React from 'react'
import { NoteCard } from '../notes/NotesCard'
import { Level, NoteCardProps, Subject } from '@/types/notes';
import { getNotesCount, getRecentNotes } from '@/actions/notes';
import { Button } from '../ui/button';
import Link from 'next/link';

const RecentNotes = async () => {
    const recentNotes = await getRecentNotes();
    const notesCount = await getNotesCount();
    if (!recentNotes || recentNotes.length === 0) {
        return (
            <div className='pt-8'>
                <h2 className="text-2xl font-bold mb-4">Recently Uploaded Notes</h2>
                <p className="text-gray-500 font-semibold">No notes found. Please wait for a teacher to upload them.</p>
            </div>
        )
    }

  return (
    <div>
      <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Recently Uploaded Notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentNotes.map((note:NoteCardProps) => (
                        <NoteCard
                            key={note.id}
                            createdAt={note.createdAt}
                            id={note.id}
                            title={note.title}
                            level={note.level}
                            subject={note.subject}
                            link={`/notes/${note.id}`}
                        />
                    ))}
                </div>
                <div className="mt-4">
                    <Button variant={"outline"}>
                        <Link href="/notes">View All Notes ({notesCount})</Link>
                    </Button>
                </div>
            </div>
    </div>
  )
}

export default RecentNotes
