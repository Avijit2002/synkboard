import { WebSocket } from "ws";
import { auth } from "./auth"
import { WebSocketWithAuth, typeMessgae } from "./types"
import { canvasStateMap, roomsMap } from "./rooms";

import { wssMessage, wssMessageType } from "@repo/common"


export async function handleMessage(message: typeMessgae, ws: WebSocketWithAuth) {

    // client authentication and room joining logic
    if (!ws.authenticated) {
        if (message.type === wssMessageType.client_authentication) {
            ws.authenticated = await auth(message.data, ws)

            // if auth fails then closing the connection
            if (!ws.authenticated) {  // added false for dev purpose, remove it after dev 
                ws.close(1000, "unauthorized!")
                return
            }

            // adding client to valid room
            if (roomsMap.get(ws.board.boardId!)) {  // checking if room exist or not

                // adding new client to room with a prechecking if this client already exist or not
                if (!roomsMap.get(ws.board.boardId!)?.includes(ws)) roomsMap.get(ws.board.boardId!)?.push(ws)
                else ws.close()

                // sending username of newly connected client to all already connected clients
                roomsMap.get(ws.board.boardId!)?.forEach((client) => {
                    ws != client && client.send(wssMessage(wssMessageType.server_userJoined, { joinedUserUsername: ws.user.userName }))
                })

            }
            else {
                roomsMap.set(ws.board.boardId!, [ws]) // room does not exist so creating room with roomId = boardId

                canvasStateMap.set(ws.board.boardId!, []) // Creating global canvas State // TODO: Load it from DB
            }

            //console.log(rooms)
            console.log(roomsMap)

            ws.send(wssMessage(wssMessageType.server_boardInfo, {
                title: ws.board.title,
                connectedUser: roomsMap.get(ws.board.boardId!)?.map(x => x.user.userName),
                state: canvasStateMap.get(ws.board.boardId!)
            }))

        } else {
            //ws.close(1000, "Unauthorized!")
            return
        }
    }


    // TODO HERE PROCESS THE MESSAGE
    // if control reaches here means request is authenticated 
    switch (message.type) {
        case wssMessageType.client_cursorLocation:
            //console.log(userCursorMap)

            // Broadcasting received cursor location to all the connected users
            roomsMap.get(ws.board.boardId!)?.forEach(client => {
                ws != client && client.send(wssMessage(wssMessageType.server_cursorChange, {
                    userName: ws.user.userName,
                    cursorLocation: message.data.cursorLocation
                }))
            })
            break;

        case wssMessageType.client_canvasStateUpdate: {

            //console.log(message.data.newLayer)

            canvasStateMap.get(ws.board.boardId!)?.push(message.data.newLayer)
            console.log(canvasStateMap.get(ws.board.boardId!))

            roomsMap.get(ws.board.boardId!)?.forEach((client) => {
                client.send(wssMessage(wssMessageType.server_updatedCanvasState, {
                    state: canvasStateMap.get(ws.board.boardId!)
                }))
            })

            break;
        }
        case wssMessageType.client_canvasLayerDelete: {

            console.log(message.data.LayerId)

            const updatedState = canvasStateMap.get(ws.board.boardId!)?.filter(x => x.id !== message.data.LayerId)
            canvasStateMap.set(ws.board.boardId!,updatedState!)
            console.log(canvasStateMap.get(ws.board.boardId!))

            roomsMap.get(ws.board.boardId!)?.forEach((client) => {
                client.send(wssMessage(wssMessageType.server_updatedCanvasState, {
                    state: canvasStateMap.get(ws.board.boardId!)
                }))
            })

            break;
        }
        default:
            break;
    }



}      