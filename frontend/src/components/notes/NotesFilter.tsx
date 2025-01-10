"use client";

import { useState } from "react";
import { MultiSelect } from "../ui/multi-select";
import Notes from "./Notes";
import { NoteCardProps } from "@/types/notes";

// Level and subject filters
const levels = [
  { value: "P6", label: "Primary 6" },
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
];

export default function NotesFilter({ notes }: { notes: NoteCardProps[] }) {
  const [filteredNotes, setFilteredNotes] = useState<NoteCardProps[]>(notes);
  const [matchedLevels, setMatchedLevels] = useState<string[]>(levels.map((level) => level.value));
  const [matchedSubjects, setMatchedSubjects] = useState<string[]>(subjects.map((subject) => subject.value));

  // Function to update filtered notes based on selected levels and subjects
  const updateFilteredNotes = (levels: string[], subjects: string[]) => {
    const matchedNotes = notes.filter(
      (note) => levels.includes(note.level) && subjects.includes(note.subject)
    );
    setFilteredNotes(matchedNotes);
  };

  // Handle changes in the level filter
  const handleLevelFilterChange = (selectedOptions: string[]) => {
    setMatchedLevels(selectedOptions);
    updateFilteredNotes(selectedOptions, matchedSubjects);
  };

  // Handle changes in the subject filter
  const handleSubjectFilterChange = (selectedOptions: string[]) => {
    setMatchedSubjects(selectedOptions);
    updateFilteredNotes(matchedLevels, selectedOptions);
  };

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <div className="font-semibold">Level</div>
          <MultiSelect
            options={levels}
            onValueChange={handleLevelFilterChange}
            defaultValue={levels.map((level) => level.value)}
            placeholder="Select levels"
            variant="lightPurple"
            maxCount={6}
            className="basic-multi-select w-full"
          />
        </div>

        <div>
          <div className="font-semibold">Subject</div>
          <MultiSelect
            options={subjects}
            onValueChange={handleSubjectFilterChange}
            defaultValue={subjects.map((subject) => subject.value)}
            placeholder="Select subjects"
            variant="lightPurple"
            maxCount={4}
            className="basic-multi-select min-w-xl"
          />
        </div>
      </div>

      <Notes notes={filteredNotes} />
    </>
  );
}
