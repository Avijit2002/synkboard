"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useWebSocket } from "../_hooks/useWebSocket";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { useBoard } from "../_context/BoardContext";
import { isLastDayOfMonth } from "date-fns";

type Props = {
  boardId: string;
};

const Canvas = ({ boardId }: Props) => {
  const { ws } = useWebSocket(boardId);
  const { wssMessageHandler, isLoaded } = useBoard()!;

  const [activeUser, setActiveUser] = useState<string[]>();

  useEffect(() => {
    if (ws)
      ws.onmessage = (event) => {
        // always parse the data before passing to any function
        const message = JSON.parse(event.data);
        console.log(message);
        wssMessageHandler(message);
      };

    return () => {
      // TODO remove onmessage event listener
    };
  });
  if (!(ws && isLoaded)) {
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
