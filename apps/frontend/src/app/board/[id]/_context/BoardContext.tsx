"use client";

import { CanvasMode, CanvasState } from "@/types/canvas";
import { wssMessageType } from "@repo/common";
import { createContext, useContext, useReducer } from "react";
import { toast } from "sonner";

interface typeInitialState {
  isLoaded: boolean;
  activeUsers?: string[];
  boardTitle?: string;

  canvasState: CanvasState
}

interface typeInitialContext extends typeInitialState {
  wssMessageHandler: Function;
  dispatch: ({type,payload}:{type:string,payload:any})=>void
}

const initialState: typeInitialState = {
  isLoaded: false,
  activeUsers: [],
  boardTitle: "",
  canvasState: {
    mode: CanvasMode.None
  }
};

const BoardContext = createContext<typeInitialContext | null>(null);

function reducer(
  state: typeInitialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {

    // WSS Events
    case wssMessageType.server_boardInfo: {
      return {
        ...state,
        isLoaded: true,
        boardTitle: action.payload.title,
        activeUsers: action.payload.connectedUser,
      };
    }
    case wssMessageType.server_userJoined: {
      toast.success(`${action.payload.joinedUserUsername} joined this room`);
      return {
        ...state,
        activeUsers: [...state.activeUsers!, action.payload.joinedUserUsername],
      };
    }
    case wssMessageType.server_userLeft: {
      toast.error(`${action.payload.leftUserUsername} left this room`);
      return {
        ...state,
        activeUsers: state.activeUsers?.filter((x) => {
          return x!=action.payload.leftUserUsername;
        }),
      };
    }

    // Canvas Events
    case "canvasStateUpdate":{
      return {
        ...state,
        mode: action.payload.mode
      }
    }
    default:
      return state;
  }
}

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ activeUsers, boardTitle, isLoaded, canvasState }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function wssMessageHandler(message: any) {
    switch (message.type) {
      case wssMessageType.server_boardInfo: {
        dispatch({
          type: wssMessageType.server_boardInfo,
          payload: message.data,
        });
        return;
      }
      case wssMessageType.server_userJoined: {
        dispatch({
          type: wssMessageType.server_userJoined,
          payload: message.data,
        });
        return;
      }
      case wssMessageType.server_userLeft: {
        dispatch({
          type: wssMessageType.server_userLeft,
          payload: message.data,
        });
        return;
      }
    }
  }

  return (
    <BoardContext.Provider
      value={{
        dispatch,
        isLoaded,
        activeUsers,
        boardTitle,
        wssMessageHandler,

        canvasState
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined)
    throw new Error("BoardContext was used outside the BoardProvider");
  return context;
}

export { BoardProvider, useBoard };
