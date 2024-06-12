'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { getPrevMsg } from "@/app/actions/user"
import { UserCard } from "@/components/UserCard"
import chat from '../chat/page';
import { useRecoilValue } from 'recoil';
import { senderIdAtom } from '@/store/Atoms';
import { Chat } from 'openai/resources/index.mjs';


export default function startChat(){
    const [seflmsg,setselfmsg] = useState("");
    const [chathistory,setchathistory] = useState([]);
    const [incommingmsg,setincommingmsg] = useState("");
    const [socket, setSocket] = useState(null);
    const session = useSession();
    const searchParams = useSearchParams();
    const recieverId = searchParams.get('recieverId')
    const sender = useRecoilValue(senderIdAtom)
    const [chatHistory,setchatHistory] = useState([])
    useEffect(function(){
        // setsender(session.data.user);
        async function fetchchat(){
            const chats = await getPrevMsg(sender.id,recieverId);
            setchatHistory(chats);
        }
        fetchchat();
    },[]);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');
        newSocket.onopen = () => {
            newSocket.send(JSON.stringify({type:"signup",id : parseInt(sender.id)}));
        }

        newSocket.onmessage = (message) => {
          const parsedata = JSON.parse(message.data);
          const {sendmessage} = parsedata;
          if (sendmessage) {
            // console.log(incommingmsg)
            setincommingmsg(sendmessage);
            setchathistory((prevHistory) => [...prevHistory, sendmessage]);           
             // console.log(chathistory)
        }
          
        }
        setSocket(newSocket);
        return () => newSocket.close();
      }, [])
    
    // console.log(chatHistory);

    return (
        <div>
            <div>This is the reciever: {recieverId}</div>
            {chatHistory.map(function(value){
                return (
                        <h1>{value.body}</h1>
                )
            })}
            <div className="m-2">
                {chathistory.map((msg, index) => (
                <div key={index} className="text-3xl">{msg}</div>
                ))}
            </div>            
            {/* <button className="p-2 bg-gray-300 border rounded w-64">{incommingmsg}</button> */}
            <input className="mt-10 p-3 bg-gray-300" onChange={function(e){setselfmsg(e.target.value)}} type="text" placeholder="message"/>
            <button className="p-2 bg-gray-300 border rounded" onClick={function(){socket?.send(JSON.stringify({type:"message",sid : parseInt(sender.id),rid:parseInt(recieverId),text:seflmsg}));
                setchathistory((prevHistory) => [...prevHistory, seflmsg]); 
            }}>send_message</button>
            {/* <div>This is sender: {session.data.user.id}</div> */}
        </div>
    )
}