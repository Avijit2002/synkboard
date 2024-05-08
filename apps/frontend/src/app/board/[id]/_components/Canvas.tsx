"use client";

import { useEffect, useState } from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useAuth } from "@clerk/nextjs";

type Props = {
  boardId: string;
};

const Canvas = ({ boardId }: Props) => {
  const [ws, setWS] = useState<null | WebSocket>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    let socket: WebSocket;
    async function connect() {
      socket = new WebSocket(`ws://localhost:3002`);
      const token = await getToken()
      socket.onopen = () => {
        console.log("Connected");
        socket.send(
          JSON.stringify({
            type: "authentication",
            data: {
              boardId,
              token,
            },
          })
        );
      };
      socket.onmessage = (event) => console.log(event.data);
      setWS(socket);
    }
    connect();
    //socket.onopen(console.log("hii"))
  }, []);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      {ws?.readyState}
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
