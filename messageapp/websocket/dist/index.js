"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
const storeclients = new Map();
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        // const parsedData = JSON.parse(data);
        // if(parsedData.type == "signup") {
        //   storeclients.set(parsedData.id, ws);
        //   if(parsedData.id && parsedData.id.readyState === WebSocket.OPEN) {
        //     storeclients.get(parsedData.id)?.send(JSON.stringify({message : parsedData.id}));
        //   }
        //   console.log("stored");
        // }
        // else if(parsedData.type == "message") {
        //   console.log("not stored");
        //   if(parsedData.recieverId && parsedData.recieverId.readyState === WebSocket.OPEN) {
        //     storeclients.get(parsedData.recieverId)?.send(JSON.stringify({message : parsedData.message}));
        //   }
        // }
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send(JSON.stringify({ message: 'Received your data!' }));
});
