import { NextRequest, NextResponse } from "next/server"

import client from "@/db"

export async function GET() {
    return Response.json({
        username : "Riktesh",
        email : "riktesh@gmail.com"
    })
}

export async function POST(req:NextRequest) {

    const body = await req.json(); 
    
    const user = await client.user.create({
        data: {
            username : body.username,
            password : body.password
        }
    })

    console.log(user.id)

    return NextResponse.json({
        message : "You are logged in"
    })
}