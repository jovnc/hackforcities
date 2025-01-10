"use server";

import db from "@/lib/prisma";

export async function getRoleByUserId(userId: string) {
    try {
        const res = await db.user.findFirst({
          where: {
            id: userId,
          },
        });
        return res?.role;
    } catch (error) {
        throw new Error("Error fetching user role");
    }
}