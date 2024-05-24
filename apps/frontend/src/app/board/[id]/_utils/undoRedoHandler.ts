import { wssMessage, wssMessageType } from "@repo/common";
import { Stack } from "./stack";

export const undoStack = new Stack();
export const redoStack = new Stack();


export const redoHandler = (ws:WebSocket,setCanUndoRedo:any) => {
    if (!redoStack.isEmpty()) {
      const popedLayer = redoStack.pop();

      if (redoStack.isEmpty()) {
        setCanUndoRedo((canUndoRedo:any) => {
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

      setCanUndoRedo((canUndoRedo:any) => {
        return {
          ...canUndoRedo,
          canUndo: true,
        };
      });
      //console.log(undoStack);
      //console.log(redoStack);
    }
  }

  export const undoHandler = (ws:WebSocket,setCanUndoRedo:any )=>{
    if (!undoStack.isEmpty()) {
      const popedLayer = undoStack.pop();

      if (undoStack.isEmpty()) {
        setCanUndoRedo((canUndoRedo:any) => {
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
      setCanUndoRedo((canUndoRedo:any) => {
        return {
          ...canUndoRedo,
          canRedo: true,
        };
      });
      //console.log(undoStack);
      //console.log(redoStack);
    } 
  }