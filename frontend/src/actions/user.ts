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

export async function changeRole(userId: string, role: string) {
    try {
        const res = await db.user.update({
          where: {
            id: userId,
          },
          data: {
            role,
          },
        });
        return res;
    } catch (error) {
        throw new Error("Error changing user role");
    }
}