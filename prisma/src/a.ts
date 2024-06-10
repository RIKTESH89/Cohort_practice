import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertuser(username: string, password: string, firstname: string, lastname: string) {

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname
        }
    })
    console.log(user)
}

insertuser("rik@gmail.com","123456","Riktesh","Singh");