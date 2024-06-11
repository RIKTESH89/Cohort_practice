"use client"
import { useEffect, useState } from 'react'

export default function() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [title,setTitle] = useState("here");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send(JSON.stringify({msg : 'Hello Server!'}));
    }
    newSocket.onmessage = (message) => {
      setTitle(JSON.parse(message.data).id);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <div>
      <div className='text-3xl bg-gray-200'>{title}</div>
      <br />
      <br />
      <button onClick={function(){socket?.send(JSON.stringify({id : Math.random()}));}} className='ml-5 p-4 text-3xl bg-gray-200'>click</button>
    </div>
  )
}