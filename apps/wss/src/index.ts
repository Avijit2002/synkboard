import "dotenv/config"
import { createServer, IncomingMessage, Server, ServerResponse } from "http"
import { WebSocketServer } from "ws";


import { typeMessgae, WebSocketWithAuth } from "./types";
import { handleMessage } from "./messageHandler";
import {  canvasStateMap, roomsMap } from "./rooms";
import { wssMessage, wssMessageType } from "@repo/common";

const httpServer = createServer()
const wss = new WebSocketServer({ server: httpServer });

// upgrading to wss if user is authenticated and allowed
//upgradeConnection(httpServer,wss)

httpServer.listen(process.env.PORT, () => {
    console.log(`Web Socket Server running on port: ${process.env.PORT}`)
})



wss.on('connection', function connection(ws: WebSocketWithAuth, request: IncomingMessage): void {
    ws.send(JSON.stringify('Connected to web Socket Server!'));
    console.log("client connected "+ request.url)

    //ws.on('message', (message) => handleMessage(message, ws))
    ws.on('message', (message) => {
        const payload: typeMessgae = JSON.parse(message.toString())
        //console.log(payload)
        handleMessage(payload, ws)
    })
    ws.on('error', console.error);

    ws.on('close', () => {
        if (ws.authenticated && ws.user.userId && ws.board.boardId) {
             const key = ws.board.boardId // here roomId = boardId

            roomsMap.get(key)?.forEach((client)=>{
                ws != client && client.send(wssMessage(wssMessageType.server_userLeft,{leftUserUsername: ws.user.userName}))
            })

            // removing the client from room
            roomsMap.set(key, roomsMap.get(key)?.filter(x => x!=ws)!)

            // if client is last user then removing the room
            !roomsMap.get(key)?.length && roomsMap.delete(key)
            
            //console.log(rooms)
            console.log(roomsMap)

            const state = canvasStateMap.get(ws.board.boardId!) // Save this state to DB
            !roomsMap.get(key)?.length && canvasStateMap.delete(ws.board.boardId)
        }
        ws.removeAllListeners()
    })

});



// wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//         client.send(message.data?.toString());
//     }
// });