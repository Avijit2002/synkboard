"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useWebSocket } from "../_hooks/useWebSocket";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { messageHandler } from "../_utils/messageHandler";

type Props = {
  boardId: string;
};

const Canvas = ({ boardId }: Props) => {
  const { ws } = useWebSocket(boardId);

  const [activeUser, setActiveUser] = useState<string[]>()

  useEffect(() => {
    if (ws) ws.onmessage = (event) => {
      // always parse the data before passing to any function
      const payload = JSON.parse(event.data)
      console.log(payload)
      messageHandler(payload)
    }


    return ()=>{
      // TODO remove onmessage event listener
    }


  });
  if (!ws) {
    return <Loader />;
  }
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <button
        onClick={() => {
          ws.send(JSON.stringify("test"));
        }}
      >
        send
      </button>
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
