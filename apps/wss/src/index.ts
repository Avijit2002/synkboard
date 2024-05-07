import "dotenv/config"
import { createServer, IncomingMessage } from "http"
import { WebSocketServer, WebSocket } from "ws";


import { authenticate } from "./auth";

const httpServer = createServer()
const wss = new WebSocketServer({ noServer: true });


httpServer.on('upgrade', function upgrade(request, socket, head) {
    socket.on('error', onSocketError);

    authenticate(request, function next(err: string | null, client: any) {
        if (err || !client) {
            socket.write(`HTTP/1.1 401 ${err}\r\n\r\n`);
            socket.destroy();
            return;
        }

        socket.removeListener('error', onSocketError);

        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request, client);
        });
    });
});

function onSocketError(err: Error): void {
    console.error(err.message)
}

httpServer.listen(process.env.PORT, () => {
    console.log(`Web Socket Server running on port: ${process.env.PORT}`)
})


wss.on('connection', function connection(ws: WebSocket, request: IncomingMessage, client?: any): void {
    ws.on('error', console.error);
    console.log(client)

    ws.on('message', function message(data, isBinary) {
        console.log(data.toString())
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    //ws.send(data.toString()!)
    ws.send('Hello! Message From Server!!');
});