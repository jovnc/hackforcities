"use server"

import db from "@/lib/prisma";

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