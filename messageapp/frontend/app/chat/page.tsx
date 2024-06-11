"use client"
import { useState,useEffect, use } from "react"

export default function chat(){
    const [seflmsg,setselfmsg] = useState("");
    const [chathistory,setchathistory] = useState<string[]>([]);
    const [incommingmsg,setincommingmsg] = useState("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');
        newSocket.onopen = () => {
          console.log('Connection established');
          newSocket.send(JSON.stringify({message :"Connection established"}));
        }

        newSocket.onmessage = (message) => {
          const parsedata = JSON.parse(message.data);
          const {sendmessage} = parsedata;
          if (sendmessage) {
            console.log(incommingmsg)
            setincommingmsg(sendmessage);
            setchathistory([...chathistory," " + sendmessage]);
            console.log(chathistory)
        }
          
        }
        setSocket(newSocket);
        return () => newSocket.close();
      }, [])

      

    return(
        <div>
            {/* <div className="m-2">{chathistory.map((msg) => <div className="text-3xl">{msg}</div>)}</div> */}
            <button className="p-2 bg-gray-300 border rounded w-64">{incommingmsg}</button>
            <input className="mt-10 p-3 bg-gray-300" onChange={function(e){setselfmsg(e.target.value)}} type="text" placeholder="message"/>
            <button className="p-2 bg-gray-300 border rounded" onClick={function(){socket?.send(JSON.stringify({type:"message",sid : 1,rid:2,text:seflmsg}));
                // setchathistory([...chathistory,seflmsg]);
            }}>riktesh_sender</button>
            <button className="p-2 bg-gray-300 border rounded" onClick={function(){socket?.send(JSON.stringify({type:"message",sid : 2,rid:1,text:seflmsg}));
                // setchathistory([...chathistory,seflmsg]);
            }}>rikki_sender</button>

            <button onClick={async () => {
                socket?.send(JSON.stringify({type:"signup",id : 1}));
            }} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2">Sign in for first</button>
            <button onClick={async () => {
                socket?.send(JSON.stringify({type:"signup",id : 2}));
            }} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2">Sign in for second</button>

        </div>
    )
}