"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useWebSocket } from "../_hooks/useWebSocket";
import {
  MouseEvent,
  PointerEvent,
  WheelEvent,
  useEffect,
  useState,
} from "react";
import Loader from "@/components/ui/Loader";
import { useBoard } from "../_context/BoardContext";
import CursorsPresence from "./svg/CursorsPresence";
import useMousePosition from "../_hooks/useMousePosition";
import { Layer, wssMessage, wssMessageType } from "@repo/common";
import { wssMessageHandler } from "../_utils/messageHandler";
import { Camera, CanvasMode, LayerType } from "@/types/canvas";
import { nanoid } from "nanoid";
import CanvasLayer from "./svg/Layer";
import { MousePointToCanvasPoint } from "@/lib/utils";
import { Stack } from "../_utils/stack";
import {
  redoHandler,
  redoStack,
  undoHandler,
  undoStack,
} from "../_utils/undoRedoHandler";
import { hex2rgb } from "../_utils/hexToRgb";

type Props = {
  boardId: string;
};

const MAX_LAYERS = 100;

const Canvas = ({ boardId }: Props) => {
  //Local States
  const [canUndoRedo, setCanUndoRedo] = useState({
    canUndo: false,
    canRedo: false,
  });
  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
  });

  const { ws } = useWebSocket(boardId);

  const { isLoaded, canvasState, dispatch, canvasLayers, color } = useBoard()!;

  //console.log(canvasLayers);

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

  // Sending cursor location to WSS
  // Listens to change in svg element
  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    const { x, y } = MousePointToCanvasPoint(e, camera);
    e.preventDefault();
    //console.log(e.clientX, e.clientY);
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(
        wssMessage(wssMessageType.client_cursorLocation, {
          cursorLocation: {
            x: x,
            y: y,
          },
        })
      );
    }
  };

  // Handling scroll to get infinite space canvas
  // Listens to change in svg element
  const handleWheel = (e: WheelEvent<SVGSVGElement>) => {
    setCamera((camera) => {
      return {
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
      };
    });
  };

  // Handling if mouse leaves the canvas window
  // Listens to change in svg element
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

  // Handling on pointer down
  // Listens on svg element
  const handleOnPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    // Create a layer object of type canvasmode
    // Give all properties to it like id, position, color etc...
    if (canvasState.mode !== CanvasMode.Inserting) {
      //canvasState.mode = CanvasMode.None
      return;
    }

    const { x, y } = MousePointToCanvasPoint(e, camera);
    console.log(x, y);

    const newLayer: Layer = {
      id: nanoid(),
      type: canvasState.LayerType,
      x: x,
      y: y,
      height: 100,
      width: 100,
      fill: hex2rgb(color),
    };

    console.log(newLayer);

    // push to wss server and undo stack
    // Operation: Layer create // TODO: Make it resuable
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(
        wssMessage(wssMessageType.client_canvasStateUpdate, {
          newLayer: newLayer,
        })
      );
    }

    undoStack.push(newLayer);
    if (!undoStack.isEmpty())
      setCanUndoRedo((canUndoRedo) => {
        return {
          ...canUndoRedo,
          canUndo: true,
        };
      });

    dispatch({
      type: "canvasStateUpdate",
      payload: {
        mode: CanvasMode.None,
      },
    });
  };

  if (!(ws && isLoaded)) {
    return <Loader />;
  }

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar
        canRdeo={canUndoRedo.canRedo}
        canUndo={canUndoRedo.canUndo}
        redo={() => redoHandler(ws, setCanUndoRedo)} // TODO
        undo={() => undoHandler(ws, setCanUndoRedo)} // TODO
      />
      <svg
        className="h-screen w-screen"
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handleOnPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px,${camera.y}px)`,
          }}
        >
          {/* <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/> */}
          {canvasLayers &&
            canvasLayers?.map((l) => {
              return (
                <CanvasLayer
                  layer={l}
                  key={l.id}
                  //onLayerPointerDown={onLayerPointerDown}
                  //onLayerPointerUp={onLayerPointerUp}
                  selectionColor={null}
                />
              );
            })}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;

// function onLayerPointerDown(
//   e: PointerEvent<SVGRectElement>,
//   layerId: string
// ) {
//   console.log(e);
//   const ele = e.target as SVGElement;

//   ele.onpointermove = (e) => {
//     ele.setAttribute("x", e.clientX.toString());
//     ele.setAttribute("y", e.clientY.toString());
//   };

//   ele.onpointerleave = (e) => {
//     ele.onpointermove = null;
//   };

//   ele.onpointerup = (e) => {
//     ele.onpointermove = null;
//   };

//   //console.log("jii")
// }

// function onLayerPointerUp(e: PointerEvent) {
//   console.log(e);
//   const ele = e.target as SVGElement;
// }
