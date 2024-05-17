import { z } from "zod"

// Express Server
export const createBoardSchema = z.object({
    userName: z.string().trim().min(1, 'Username is required and cannot be empty'),
    title: z.string().trim().min(1, 'Title is required and cannot be empty'),
    orgId: z.string().trim().min(1, 'OrgId is required and cannot be empty'),
})

export type typeCreateBoardSchema = z.infer<typeof createBoardSchema>


// TODO: can we taken from prisma
export type typeBoard = {
    authorId: string,
    userName: string,
    createdAt: Date;
    id: string;
    imageUrl: string;
    orgId: string;
    title: string;
    updatedAt: Date;
  };


// WSS server

// Standard message object to send message
export function wssMessage(type: string, data: any){
    return JSON.stringify({
        type, data
    })
}


// Naming convention followed: sourceOfOrigination_type
export enum wssMessageType{

    // client to server
    client_authentication = "client/authentication",
    client_cursorLocation = "client/cursorLocation",
    client_canvasStateUpdate = "client/canvasStateUpdate",
    client_canvasLayerDelete = "client/canvasLayerDelete",


    // server to client
    server_boardInfo = "server/boardinfo",
    server_userJoined = "server/userJoined",
    server_userLeft = "server/userLeft",
    server_cursorChange = "server/cursorChange",
    server_updatedCanvasState = "client/updatedCanvasState"

}