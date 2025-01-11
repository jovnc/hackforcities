"use server"

import db from "@/lib/prisma";
import { Level, Subject } from "@/types/notes";

export async function getAllNotes() {
    try {
        const res = await db.notes.findMany();
        console.log(res);
        return res;
    } catch (error) {
        console.error("Error fetching notes", error);
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
        console.error("Error fetching note", error);
        return null;
    }
}
export async function getRecentNotes() {
    try {
      const res = await db.notes.findMany({
        orderBy: {
          createdAt: "desc", // Adjust this to the appropriate timestamp field in your database
        },
        take: 3, // Limit to 3 results
      });
      console.log("Recent Notes:", res);
      return res.map((note) => ({
        ...note,
        level: note.level as Level, // Explicit cast to Level
        subject: note.subject as Subject,
      }));
      return res;
    } catch (error) {
      console.error("Error fetching recent notes", error);
      return [];
    }
  }

