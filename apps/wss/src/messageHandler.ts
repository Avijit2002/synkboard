import { auth } from "./auth"
import { WebSocketWithAuth, typeMessgae } from "./types"
import { WebSocket } from "ws"

export async function handleMessage(message: typeMessgae, ws: WebSocketWithAuth) {

    if (message.type === "authentication") {
        ws.authenticated =await auth(message.data, ws)
    }
    if (!ws.authenticated) {
        ws.close(1000, "unauthorized!")
    }
    // TODO HERE PROCESS THE MESSAGE
    // if control reaches here means request is authenticated 


}      