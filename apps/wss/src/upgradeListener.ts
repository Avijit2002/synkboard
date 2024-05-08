// import { IncomingMessage } from "http"

// //import { authenticate } from "./auth";
// import { Server as httpServer } from "http";
// import { WebSocketServer  } from "ws";

// export function upgradeConnection(httpServer: httpServer, wss: WebSocketServer) {
//     httpServer.on('upgrade', function upgrade(request:IncomingMessage, socket:any, head:any) {
//         const urlParams = new URLSearchParams(request.url);
//         console.log(urlParams)
        
//         socket.on('error', onSocketError);

//         // authenticate(request, function next(err: string | null, client: any) {
//         //     if (err || !client) {
//         //         socket.write(`HTTP/1.1 401 ${err}\r\n\r\n`);
//         //         socket.destroy();
//         //         return;
//         //     }

//         //     socket.removeListener('error', onSocketError);

//         //     wss.handleUpgrade(request, socket, head, function done(ws) {
//         //         wss.emit('connection', ws, request, client);
//         //     });
//         // });
//     });

// }

// function onSocketError(err: Error): void {
//     console.error(err.message)
// }