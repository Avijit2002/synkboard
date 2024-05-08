import "dotenv/config"
import { createServer, IncomingMessage, Server, ServerResponse } from "http"
import { WebSocketServer } from "ws";


import { typeMessgae, WebSocketWithAuth } from "./types";
import { handleMessage } from "./messageHandler";

const httpServer = createServer()
const wss = new WebSocketServer({ server:httpServer });

// upgrading to wss if user is authenticated and allowed
//upgradeConnection(httpServer,wss)

httpServer.listen(process.env.PORT, () => {
    console.log(`Web Socket Server running on port: ${process.env.PORT}`)
})



wss.on('connection', function connection(ws: WebSocketWithAuth, request: IncomingMessage): void {
    ws.send('Connected to web Socket Server!');
    

    //ws.on('message', (message) => handleMessage(message, ws))
    ws.on('message', (message) => {
        const payload:typeMessgae = JSON.parse(message.toString())
        handleMessage(payload, ws)
    })
    ws.on('error', console.error);

    ws.on('close', () => {
        ws.removeAllListeners()
    })

});



// wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//         client.send(message.data?.toString());
//     }
// });