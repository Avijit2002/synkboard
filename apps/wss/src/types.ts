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

export type Layer = {
    id: string
    type: number  // type of layertype LayerType enum Rectangle is number
    x: number
    y: number
    height: number,
    width: number,
    fill: Color,
    points?: number[][] // for path layer
    value?: string   // for note layer
}

export type Color = {
    r: number,
    g: number,
    b: number
}




export interface typeMessgae { type: string, data: any }