"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useWebSocket } from "../_hooks/useWebSocket";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader";

type Props = {
  boardId: string;
};

const Canvas = ({ boardId }: Props) => {
  const { ws } = useWebSocket(boardId);

  useEffect(() => {
    if (ws) ws.onmessage = (event) => console.log(event.data);
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
