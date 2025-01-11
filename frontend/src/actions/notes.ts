"use server"

import db from "@/lib/prisma";
import { Level, Subject } from "@/types/notes";

export async function getAllNotes() {
    try {
        const res = await db.notes.findMany();
        return res;
    } catch (error) {
        return [];
    }
}

export async function getNoteById(id: string) {
    try {
        const res = await db.notes.findUnique({
            where: {
                id: id
            }
        });
        return res;
    } catch (error) {
        return null;
    }
}
export async function getRecentNotes() {
    try {
      const res = await db.notes.findMany({
        orderBy: {
          createdAt: "desc", // Adjust this to the appropriate timestamp field in your database
        },
        take: 5, // Limit to 5 results
      });
    
      return res.map((note) => ({
        ...note,
        level: note.level as Level, // Explicit cast to Level
        subject: note.subject as Subject,
      }));
    } catch (error) {
      console.error("Error fetching recent notes", error);
      return [];
    }
  }

  export async function getNotesCount() {
    try {
        const count = await db.notes.count();
        return count;
    } catch (error) {
        console.error("Error fetching notes count", error);
        return 0; // Return 0 if an error occurs
    }
}
