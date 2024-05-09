import { useAuth, useUser } from "@clerk/nextjs";
import { wssMessage, wssMessageType } from "@repo/common";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useWebSocket(boardId: string) {
    const [ws, setWS] = useState<null | WebSocket>(null);
    const { getToken } = useAuth();
    const { user } = useUser()

    useEffect(() => {
        let socket: WebSocket;
        async function connect() {
            socket = new WebSocket(process.env.WSS_URL!);
            const token = await getToken()
            socket.onopen = () => {
                console.log("Connected");
                toast.success("Connected to server!")
                socket.send(
                    wssMessage(wssMessageType.authentication, {
                        boardId,
                        username: user?.username,
                        token
                    })
                    // JSON.stringify({
                    //     type: "authentication",
                    //     data: {
                    //         boardId,
                    //         token
                    //     },
                    // })
                );
            };
            socket.onclose = (event) => {
                event.reason && toast.error(event.reason)
                console.log(event.reason)
            }
            setWS(socket);

        }
        connect();

        return () => {
            socket?.close()
        }
    }, []);

    return { ws }
}