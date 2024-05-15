"use client";

import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { wssMessageType } from "@repo/common";
import { createContext, useContext, useReducer } from "react";
import { toast } from "sonner";

interface typeInitialState {
  isLoaded: boolean;
  activeUsers?: {
    userName: string;
    cursorLocation?: { x: number; y: number };
  }[];
  boardTitle?: string;

  canvasState: CanvasState;
}

interface typeInitialContext extends typeInitialState {
  wssMessageHandler: Function;
  dispatch: ({ type, payload }: { type: string; payload: any }) => void;
}

const initialState: typeInitialState = {
  isLoaded: false,
  activeUsers: [],
  boardTitle: "",
  canvasState: {
    mode: CanvasMode.None,
  },
};

const BoardContext = createContext<typeInitialContext | null>(null);

function reducer(
  state: typeInitialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    // WSS Events
    case wssMessageType.server_boardInfo: {
      //console.log(action)
      return {
        ...state,
        isLoaded: true,
        boardTitle: action.payload.title,
        activeUsers: action.payload.connectedUser.map((x:string)=>{
          return {
            userName: x
          }
        }),
      };
    }
    case wssMessageType.server_userJoined: {
      toast.success(`${action.payload.joinedUserUsername} joined this room`);
      return {
        ...state,
        activeUsers: [...state.activeUsers!,{userName: action.payload.joinedUserUsername}],
      };
    }
    case wssMessageType.server_userLeft: {
      toast.error(`${action.payload.leftUserUsername} left this room`);
      return {
        ...state,
        activeUsers: state.activeUsers?.filter((x) => {
          return x.userName != action.payload.leftUserUsername;
        }),
      };
    }

    // Canvas Events
    case "canvasStateUpdate": {
      console.log(state.canvasState);
      return {
        ...state,
        canvasState: {
          ...state.canvasState,
          mode: action.payload.mode,
          LayerType: action.payload.LayerType,
        },
      };
    }

    case wssMessageType.server_cursorChange: {
      return {
        ...state,
        activeUsers: state.activeUsers?.map(user=>{
          if(user.userName === action.payload.userName){
            return {
              userName: user.userName,
              cursorLocation: action.payload.cursorLocation
            }
          }
          return user
        })
      };
    }

    default:
      return state;
  }
}

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ activeUsers, boardTitle, isLoaded, canvasState }, dispatch] =
    useReducer(reducer, initialState);

  // TODO: Refactor this into another file. Don't need to pass in context provider
  function wssMessageHandler(message: any) {
    switch (message.type) {
      case wssMessageType.server_boardInfo: {
        //console.log(message.data)
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
      case wssMessageType.server_cursorChange: {
        dispatch({
          type: wssMessageType.server_cursorChange,
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

        canvasState,
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
