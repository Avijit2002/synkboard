import { WebSocket } from "ws"
export interface WebSocketWithAuth extends WebSocket {
    authenticated: boolean | undefined,
}


export interface typeMessgae { type: string, data: any }