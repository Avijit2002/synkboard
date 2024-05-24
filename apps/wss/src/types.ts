import { WebSocket } from "ws"
export interface WebSocketWithAuth extends WebSocket {
    authenticated: boolean | undefined,
    board: {
        boardId: string | undefined,
        title: string | undefined
    },
    user: {
        userId: string | undefined,
        userName: string | undefined
    }
}






export interface typeMessgae { type: string, data: any }