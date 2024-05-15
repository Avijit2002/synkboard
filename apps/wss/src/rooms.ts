import { WebSocketWithAuth } from "./types";

// interface typeRooms {
//     [propName: string]: WebSocketWithAuth[];
// }
// export const rooms: typeRooms = {}
// Not able to remove roomId key from object if ws list is empty so used Map instead

export const roomsMap = new Map<string, WebSocketWithAuth[]>()

export const userCursorMap = new Map<string, { x: number, y: number } | null>