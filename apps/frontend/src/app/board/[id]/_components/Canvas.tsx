"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useWebSocket } from "../_hooks/useWebSocket";
import { MouseEvent, PointerEvent, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import { useBoard } from "../_context/BoardContext";
import CursorsPresence from "./svg/CursorsPresence";
import useMousePosition from "../_hooks/useMousePosition";
import { wssMessage, wssMessageType } from "@repo/common";
import { wssMessageHandler } from "../_utils/messageHandler";
import { CanvasMode, Layer, LayerType } from "@/types/canvas";
import { nanoid } from "nanoid";
import LayerPresence from "./svg/LayerPresence";

type Props = {
  boardId: string;
};

const MAX_LAYERS = 100;

const Canvas = ({ boardId }: Props) => {
  const { ws } = useWebSocket(boardId);

  const { isLoaded, canvasState, dispatch, canvasLayers } = useBoard()!;

  console.log(canvasLayers);

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
    //console.log(e.clientX, e.clientY);
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

  const handleMouseLeave = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(
        wssMessage(wssMessageType.client_cursorLocation, {
          cursorLocation: undefined,
        })
      );
    }
  };

  const handleOnPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    // Create a layer object of type canvasmode
    // Give all properties to it like id, position, color etc...
    if(canvasState.mode !== CanvasMode.Inserting) return;

    const newLayer: Layer = {
      id: nanoid(),
      type: canvasState.LayerType,
      x: e.clientX,
      y: e.clientY,
      height: 100,
      width: 100,
      fill: {
        r:0,
        g:0,
        b:0
      }
    };

    console.log(newLayer)

    // push to history stack
    // TODO


    // push to wss server
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(
        wssMessage(wssMessageType.client_canvasStateUpdate, {
          newLayer: newLayer,
        })
      );
    }

  };

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
        onMouseLeave={handleMouseLeave}
        onPointerDown={handleOnPointerDown}
      >
        <g>
          {/* <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/> */}
          <LayerPresence />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
