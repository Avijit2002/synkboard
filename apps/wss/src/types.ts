import { WebSocket } from "ws"
export interface WebSocketWithAuth extends WebSocket {
    authenticated: boolean | undefined,
    boardId: string | undefined,
    userId: string | undefined
}


export interface typeMessgae { type: string, data: any }