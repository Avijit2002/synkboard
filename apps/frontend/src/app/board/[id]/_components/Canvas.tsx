"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useWebSocket } from "../_hooks/useWebSocket";
import { MouseEvent, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import { useBoard } from "../_context/BoardContext";
import CursorsPresence from "./svg/CursorsPresence";
import useMousePosition from "../_hooks/useMousePosition";
import { wssMessage, wssMessageType } from "@repo/common";
import { wssMessageHandler } from "../_utils/messageHandler";

type Props = {
  boardId: string;
};

const Canvas = ({ boardId }: Props) => {
  const { ws } = useWebSocket(boardId);

  const { activeUsers, isLoaded, canvasState, dispatch } = useBoard()!;

  //console.log(isLoaded);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        // always parse the data before passing to any function
        const message = JSON.parse(event.data);
        console.log(message);
        wssMessageHandler(dispatch, message);
      };
    }

    return () => {
      // TODO remove onmessage event listener
    };
  }, [ws]);

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    console.log(e.clientX, e.clientY);
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(
        wssMessage(wssMessageType.client_cursorLocation, {
          cursorLocation: {
            x: e.clientX,
            y: e.clientY,
          },
        })
      );
    }
  };

  const handleMouseLeave = (e: MouseEvent<SVGSVGElement>) =>{
    e.preventDefault();
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(
        wssMessage(wssMessageType.client_cursorLocation, {
          cursorLocation: undefined,
        })
      );
    }

  }

  if (!(ws && isLoaded)) {
    return <Loader />;
  }

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        dispatch={dispatch}
        canRdeo={false}
        canUndo={false}
        redo={() => {}} // TODO
        undo={() => {}} // TODO
      />
      <svg 
      className="h-screen w-screen" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
        <g>
          {/* <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/> */}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
