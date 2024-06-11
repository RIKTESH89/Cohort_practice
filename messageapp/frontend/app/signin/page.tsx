"use client"

import { signup } from "@/app/actions/user"
import { useState,useEffect } from "react"

export default function Signin(){

    const [username,setUsername] = useState("")
    const [title,setTitle] = useState("")
    const [password,setPassword] = useState("")
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');
        newSocket.onopen = () => {
          console.log('Connection established');
          newSocket.send(JSON.stringify({message :"Connection established"}));
        }

        newSocket.onmessage = (message) => {
          const parsedata = JSON.parse(message.data);
          const {senddata} = parsedata;
          setTitle(senddata);
          console.log(parsedata)
        }
        setSocket(newSocket);
        return () => newSocket.close();
      }, [])

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-3xl">{title}</h1>
            <input onChange={function(e){setUsername(e.target.value)}} type="text" placeholder="username" className="p-4"/>
            <br />
            <br />
            <input onChange={function(e){setPassword(e.target.value)}} type="text" placeholder="password"  className="p-4"/>
            <button onClick={async () => {
                const response = await signup(username, password);
                socket?.send(JSON.stringify({type:"signup",id : response}));
            }} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2">Sign in</button>
           {/* <div className="p-3 bg-gray-200 text">{title}</div> */}
           </div> </div>
            </div>
    )
}