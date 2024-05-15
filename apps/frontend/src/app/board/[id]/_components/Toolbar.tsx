import React from "react";
import ToolButton from "./ToolButton";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

type ToolbarProps = {
  canvasState: CanvasState;
  dispatch: ({ type, payload }: { type: string; payload: any }) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRdeo: boolean;
};

const Toolbar = ({
  canvasState,
  dispatch,
  undo,
  redo,
  canRdeo,
  canUndo,
}: ToolbarProps) => {
  return (
    <div className="absolute top-1/2 left-3 -translate-y-1/2 p-3 flex flex-col gap-y-5 content-center items-center">
      <div className="shadow-sm rounded-md bg-white flex flex-col items-center gap-y-3 p-2 w-full">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() =>
            dispatch({
              type: "canvasStateUpdate",
              payload: {
                mode: CanvasMode.None,
              },
            })
          }
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Translating
          }
          //isDisabled={true}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() =>
            dispatch({
              type: "canvasStateUpdate",
              payload: {
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Text
              },
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.LayerType === LayerType.Text
          }
          isDisabled={false}
        />
        <ToolButton
          label="Sticky notes"
          icon={StickyNote}
          onClick={() =>
            dispatch({
              type: "canvasStateUpdate",
              payload: {
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Note
              },
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.LayerType === LayerType.Note
          }
          isDisabled={false}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() =>
            dispatch({
              type: "canvasStateUpdate",
              payload: {
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Rectangle
              },
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.LayerType === LayerType.Rectangle
          }
          isDisabled={false}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() =>
            dispatch({
              type: "canvasStateUpdate",
              payload: {
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Ellipse
              },
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.LayerType === LayerType.Ellipse
          }
          isDisabled={false}
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() =>
            dispatch({
              type: "canvasStateUpdate",
              payload: {
                mode: CanvasMode.Pencil,
              },
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Pencil  
          }
          isDisabled={false}
        />
      </div>




      <div className="shadow-sm rounded-md bg-white flex flex-col items-center gap-y-3 py-2 w-full">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={() => {}}
          isActive={false}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={() => {}}
          isActive={false}
          isDisabled={!canRdeo}
        />
      </div>
    </div>
  );
};

export default Toolbar;
