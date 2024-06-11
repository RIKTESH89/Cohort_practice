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
        storeclients.get(parsedData.id)?.send(JSON.stringify({senddata : parsedData.id,msg: "Yayy! your connection is successful"}));
      }
      console.log("stored");
    }
    else if(parsedData.type == "message") {
      console.log("not stored");
      if(storeclients.get(parsedData.rid)){
      console.log(parsedData)
      }
      if(storeclients.get(parsedData.rid) && storeclients.get(parsedData.rid).readyState === WebSocket.OPEN) {
        console.log("back to reciever")
        // console.log(storeclients)
        storeclients.get(parsedData.rid)?.send(JSON.stringify({sendmessage : parsedData.text}));
      }
    }
  });
  ws.send(JSON.stringify({ message: 'Received your data!' }));
});

