import { wssMessageType } from "@repo/common";

// All the message received from wss server is handled here.
export function wssMessageHandler(dispatch: ({ type, payload }: { type: string; payload: any }) => void, message: any) {
    switch (message.type) {

        case wssMessageType.server_boardInfo: {
            // Getting initial board info after connection and authentication.
            // payload: board title, list of connected users
            dispatch({
                type: wssMessageType.server_boardInfo,
                payload: message.data,
            });
            return;
        }
        case wssMessageType.server_userJoined: {
            // Getting username of new user that joined
            // payload: joinedUserUsername
            dispatch({
                type: wssMessageType.server_userJoined,
                payload: message.data,
            });
            return;
        }
        case wssMessageType.server_userLeft: {
            // Getting username of user that left
            // payload: leftUserUsername
            dispatch({
                type: wssMessageType.server_userLeft,
                payload: message.data,
            });
            return;
        }
        case wssMessageType.server_cursorChange: {
            // Getting realtime cursor location of other users
            // payload: username, cursorLocation
            dispatch({
                type: wssMessageType.server_cursorChange,
                payload: message.data,
            });
            return;
        }

        case wssMessageType.server_updatedCanvasState: {

            dispatch({
                type: wssMessageType.server_updatedCanvasState,
                payload: message.data
            })
            return;
        }
    }
}