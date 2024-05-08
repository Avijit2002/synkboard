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
  const [isReady, setIsReady] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    let socket: WebSocket;
    async function connect() {
      socket = new WebSocket(`ws://localhost:3002`);
      socket.onopen = () => {
        console.log("Connected");
      };
      socket.onmessage = (event) => console.log(event.data);
      setWS(socket);
    }
    connect();
    //socket.onopen(console.log("hii"))
  }, []);

  useEffect(() => {
    async function send() {
      const token = await getToken();
      if (isReady && ws?.OPEN) {
        ws?.send(
          JSON.stringify({
            type: "authorization",
            data: {
              boardId,
              token,
            },
          })
        );
      }
    }
    send();
  },[isReady,ws?.readyState]);

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
