import { WebSocket } from "ws";
import { auth } from "./auth"
import { WebSocketWithAuth, typeMessgae } from "./types"
import { roomsMap } from "./rooms";

import { wssMessage, wssMessageType } from "@repo/common"


export async function handleMessage(message: typeMessgae, ws: WebSocketWithAuth) {

    // client authentication and room joining logic
    if (!ws.authenticated && message.type === wssMessageType.client_authentication) {
        ws.authenticated = await auth(message.data, ws)

        // if auth fails then closing the conn
        if (!ws.authenticated) {
            ws.close(1000, "unauthorized!")
            return
        }

        // adding client to valid room

        // if (rooms[message.data.boardId] && !rooms[message.data.boardId]?.includes(ws)) rooms[message.data.boardId]?.push(ws)
        // else rooms[message.data.boardId] = [ws] // Not able to remove roomId key from object if ws list is empty so used Map instead

        if (roomsMap.get(ws.board.boardId!)) {  // checking if room exist or not

            // adding new client to room with a prechecking if this client already exist or not
            if (!roomsMap.get(ws.board.boardId!)?.includes(ws)) roomsMap.get(ws.board.boardId!)?.push(ws)
            else ws.close()

            // sending username of newly connected client to all already connected clients
            roomsMap.get(ws.board.boardId!)?.forEach((client) => {
                ws != client && client.send(wssMessage(wssMessageType.server_userJoined, { joinedUserUsername: ws.user.userName }))
            })

        }
        else roomsMap.set(ws.board.boardId!, [ws]) // room does not exist so creating room with roomId = boardId

        //console.log(rooms)
        console.log(roomsMap)

        ws.send(wssMessage(wssMessageType.server_boardInfo, {
            title: ws.board.title,
            connectedUser: roomsMap.get(ws.board.boardId!)?.map(x => x.user.userName)
        }))

    }

    // closing connection if auth fails
    if (!ws.authenticated) {
        ws.close(1000, "Unauthorized!")
        return
    }

    // TODO HERE PROCESS THE MESSAGE
    // if control reaches here means request is authenticated 
    else if (false) {

    }



}      