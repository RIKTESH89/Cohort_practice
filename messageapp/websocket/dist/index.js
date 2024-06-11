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
        var _a, _b;
        const parsedData = JSON.parse(data);
        if (parsedData.type == "signup") {
            storeclients.set(parsedData.id, ws);
            if (storeclients.get(parsedData.id) && storeclients.get(parsedData.id).readyState === ws_1.WebSocket.OPEN) {
                console.log("accessed the websocket");
                (_a = storeclients.get(parsedData.id)) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ senddata: parsedData.id }));
            }
            console.log("stored");
        }
        else if (parsedData.type == "message") {
            console.log("not stored");
            if (parsedData.recieverId && parsedData.recieverId.readyState === ws_1.WebSocket.OPEN) {
                (_b = storeclients.get(parsedData.recieverId)) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({ message: parsedData.message }));
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
