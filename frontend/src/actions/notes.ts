"use server"

import db from "@/lib/prisma";

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