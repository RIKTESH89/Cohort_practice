import express from 'express'
import { WebSocketServer , WebSocket } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

const storeclients = new Map();

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);


  ws.on('message', function message(data:string, isBinary) {

    const parsedData = JSON.parse(data);
    if(parsedData.type == "signup") {
      storeclients.set(parsedData.id, ws);
      if(storeclients.get(parsedData.id) && storeclients.get(parsedData.id).readyState === WebSocket.OPEN) {
        console.log("accessed the websocket")
        storeclients.get(parsedData.id)?.send(JSON.stringify({senddata : parsedData.id}));
      }
      console.log("stored");
    }
    else if(parsedData.type == "message") {
      console.log("not stored");
      if(parsedData.recieverId && parsedData.recieverId.readyState === WebSocket.OPEN) {
        storeclients.get(parsedData.recieverId)?.send(JSON.stringify({message : parsedData.message}));
      }
    }

    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(data, { binary: isBinary });
    //   }
    // });
  });
  ws.send(JSON.stringify({ message: 'Received your data!' }));
});

