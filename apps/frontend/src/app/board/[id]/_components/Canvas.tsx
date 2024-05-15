"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useWebSocket } from "../_hooks/useWebSocket";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { useBoard } from "../_context/BoardContext";
import { isLastDayOfMonth } from "date-fns";
import CursorsPresence from "./svg/CursorsPresence";
import useMousePosition from "../_hooks/useMousePosition";
import { wssMessage, wssMessageType } from "@repo/common";
import { useUser } from "@clerk/nextjs";

type Props = {
  boardId: string;
};

const Canvas = ({ boardId }: Props) => {
  const { ws } = useWebSocket(boardId);

  const { wssMessageHandler, activeUsers, isLoaded, canvasState, dispatch } =
    useBoard()!;

  //console.log(isLoaded);

  const currentMousePosition = useMousePosition();
  //console.log(currentMousePosition)

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        // always parse the data before passing to any function
        const message = JSON.parse(event.data);
        console.log(message);
        wssMessageHandler(message);
      };
    }

    return () => {
      // TODO remove onmessage event listener
    };
  },[ws]);

  useEffect(() => {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(
        wssMessage(wssMessageType.client_cursorLocation, {
          cursorLocation: {
            x: currentMousePosition?.x,
            y: currentMousePosition?.y,
          },
        })
      );
    }
  }, [currentMousePosition]);

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
      <Toolbar
        canvasState={canvasState}
        dispatch={dispatch}
        canRdeo={false}
        canUndo={false}
        redo={() => {}} // TODO
        undo={() => {}} // TODO
      />
      <svg className="h-screen w-screen">
        <g>
          {/* <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/> */}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
