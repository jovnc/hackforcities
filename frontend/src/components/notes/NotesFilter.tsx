"use client";

import { useState } from "react";
import { MultiSelect } from "../ui/multi-select";
import Notes from "./Notes";
import { NoteCardProps } from "@/types/notes";


// Level and subject filters
const levels = [
  { value: "P6", label: "Primary 6"},
  { value: "P5", label: "Primary 5" },
  { value: "P4", label: "Primary 4" },
  { value: "P3", label: "Primary 3" },
  { value: "P2", label: "Primary 2" },
  { value: "P1", label: "Primary 1" },
];

const subjects = [
  { value: "Math", label: "Math" },
  { value: "Science", label: "Science" },
  { value: "English", label: "English" },
]

export default function NotesFilter({notes} : {notes: NoteCardProps[]}) {

    const [filteredNotes, setFilteredNotes] = useState<NoteCardProps[]>(notes);

  // Handle changes in the level filter
  const handleLevelFilterChange = (selectedOptions: any) => {
    const matchedLevels = levels.filter((level) =>
      selectedOptions.includes(level.value)
    );
    const matchedNotes = notes.filter((note) =>
        matchedLevels.some((level) => level.value === note.level)
      );
      
    console.log(matchedNotes)
    setFilteredNotes(matchedNotes);
  };

  // Handle changes in the level filter
  const handleSubjectFilterChange = (selectedOptions: any) => {
    const matchedSubjects = subjects.filter((subject) =>
      selectedOptions.includes(subject.value)
    );

    const matchedNotes = 
      notes.filter((note) =>
        matchedSubjects.some((subject) => subject.value === note.subject)
      )
    ;

    console.log(matchedNotes)
    setFilteredNotes(matchedNotes);
  };


  return (
    <>
      <MultiSelect
        options={levels}
        onValueChange={handleLevelFilterChange}
        defaultValue={levels.map((level) => level.value)}
        placeholder="Select levels"
        variant="lightPurple"
        maxCount={3}
        className="basic-multi-select w-full"
      />

<MultiSelect
        options={subjects}
        onValueChange={handleLevelFilterChange}
        defaultValue={subjects.map((level) => level.value)}
        placeholder="Select levels"
        variant="lightPurple"
        maxCount={3}
        className="basic-multi-select min-w-xl"
      />

      <Notes notes={filteredNotes}/>
    </>
  );
}
