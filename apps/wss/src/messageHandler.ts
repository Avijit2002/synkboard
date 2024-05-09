import { WebSocket } from "ws";
import { auth } from "./auth"
import { WebSocketWithAuth, typeMessgae } from "./types"
import {  roomsMap } from "./rooms";

import {wssMessageType} from "@repo/common"


export async function handleMessage(message: typeMessgae, ws: WebSocketWithAuth) {

    // client authentication and room joining logic
    if (!ws.authenticated && message.type === wssMessageType.authentication) {
        ws.authenticated = await auth(message.data, ws)

        // if auth fails then closing the conn
        if (!ws.authenticated) {
            ws.close(1000, "unauthorized!")
            return
        }

        // adding client to valid room

        // if (rooms[message.data.boardId] && !rooms[message.data.boardId]?.includes(ws)) rooms[message.data.boardId]?.push(ws)
        // else rooms[message.data.boardId] = [ws] // Not able to remove roomId key from object if ws list is empty so used Map instead

        if(roomsMap.get(message.data.boardId) && roomsMap.get(message.data.boardId)?.includes(ws)) roomsMap.get(message.data.boardId)?.push(ws)
        else roomsMap.set(message.data.boardId,[ws])

        //console.log(rooms)
        console.log(roomsMap)

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

    //TODO: create a global type for messages
    //TODO: create enums for msg type instead of hard coding


}      