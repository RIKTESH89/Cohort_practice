"use server"

import prisma from "@/db"

export async function signup(username:string, password:string,email:string) {
    // should add zod validation here
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email:email
        }
    });

    console.log(user.id);

    return user.id
}

export async function getUsersByFilter(filter:string) {
    const users = await prisma.user.findMany({
      where: {
        username: {
          startsWith: filter
        }
      }
    });
    return users;
  }

  export async function getPrevMsg(sid:string,rid:string){
    const messages = await prisma.message.findMany({
      where: {
        
          
            OR: [
              {
                AND: [
                  { senderId: sid },
                  { recieverId: rid },
                ],
              },
              {
                AND: [
                  { senderId: rid },
                  { recieverId: sid },
                ],
              },
            ],
          },
      
    });
    
    
    return messages;
  }