"use server";

import db from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
    // ...options,
  });

export async function uploadFileToUT(file: File) {
    try {
        const res = await utapi.uploadFiles([file]);
        
        const fileUrl = res[0].data?.url;
        const fileName = res[0].data?.name;
        
        return { fileUrl, fileName, success: true };
    } catch (error) {
        throw new Error("Error uploading file");
    }
}

export async function addFilesToDB({ fileUrl, title, subject, level }: { fileUrl: string, title: string, subject: string, level: string }) {
    try {
        const res = await db.notes.create({
            data: {
                link: fileUrl,
                title,
                subject,
                level,
            }
        });
        return { id: res.id, success: true };
    } catch (error) {
        throw new Error("Error adding file to database");
    }
}