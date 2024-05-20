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
import { wssMessage, wssMessageType } from "@repo/common";
import { wssMessageHandler } from "../_utils/messageHandler";
import { Camera, CanvasMode, Layer, LayerType } from "@/types/canvas";
import { nanoid } from "nanoid";
import CanvasLayer from "./svg/Layer";
import { MousePointToCanvasPoint } from "@/lib/utils";
import { Stack } from "../_utils/stack";

type Props = {
  boardId: string;
};

const MAX_LAYERS = 100;

const undoStack = new Stack();
const redoStack = new Stack();

const Canvas = ({ boardId }: Props) => {

  const [canUndoRedo, setCanUndoRedo] = useState({
    canUndo: false,
    canRedo: false,
  });
  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
  });
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

  const handleWheel = (e: WheelEvent<SVGSVGElement>) => {
    setCamera((camera) => {
      return {
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
      };
    });
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
      fill: {
        r: 0,
        g: 0,
        b: 0,
      },
    };

    console.log(newLayer);

    // push to history stack
    // TODO

    // push to wss server and undoRedoHistory stack
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
  };

  function onLayerMouseMove(){}

  function onLayerPointerDown(e: PointerEvent, layerId: string) {
    console.log(e);
    const ele = e.target
    ele.addEventListener('onmousemove',onLayerMouseMove)
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
        canRdeo={canUndoRedo.canRedo}
        canUndo={canUndoRedo.canUndo}
        redo={() => {
          if (!redoStack.isEmpty()) {
            const popedLayer = redoStack.pop();

            if (redoStack.isEmpty()) {
              setCanUndoRedo((canUndoRedo) => {
                return {
                  ...canUndoRedo,
                  canRedo: false,
                };
              });
            }

            if (ws && ws.readyState === ws.OPEN) {
              ws.send(
                wssMessage(wssMessageType.client_canvasStateUpdate, {
                  newLayer: popedLayer,
                })
              );
            }

            undoStack.push(popedLayer!);

            setCanUndoRedo((canUndoRedo) => {
              return {
                ...canUndoRedo,
                canUndo: true,
              };
            });
            //console.log(undoStack);
            //console.log(redoStack);
          }
        }} // TODO
        undo={() => {
          if (!undoStack.isEmpty()) {
            const popedLayer = undoStack.pop();

            if (undoStack.isEmpty()) {
              setCanUndoRedo((canUndoRedo) => {
                return {
                  ...canUndoRedo,
                  canUndo: false,
                };
              });
            }
            
            if (ws && ws.readyState === ws.OPEN) {
              ws.send(
                wssMessage(wssMessageType.client_canvasLayerDelete, {
                  LayerId: popedLayer?.id,
                })
              );
            }


            redoStack.push(popedLayer!);
            setCanUndoRedo((canUndoRedo) => {
              return {
                ...canUndoRedo,
                canRedo: true,
              };
            });
            //console.log(undoStack);
            //console.log(redoStack);
          } 
        }} // TODO
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
                  onLayerPointerDown={onLayerPointerDown}
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
