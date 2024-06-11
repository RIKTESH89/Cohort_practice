"use server"

import prisma from "@/db"

export async function signup(username: string, password: string) {
    // should add zod validation here
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    });

    console.log(user.id);

    return user.id
}