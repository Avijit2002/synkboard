"use client"

import { wssMessageType } from "@repo/common";
import { createContext, useContext, useReducer } from "react";

interface typeInitialState {
  activeUser?: string[];
  boardTitle?: string;
}

interface typeInitialContext extends typeInitialState{
    wssMessageHandler:Function
}

const initialState: typeInitialState = {
  activeUser: [],
  boardTitle: "",
};

const BoardContext = createContext<typeInitialContext | null>(null);

function reducer(
  state: typeInitialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case wssMessageType.boardInfo: {
      return {
        ...state,
        boardTitle: action.payload.title,
        activeUser: action.payload.connectedUser,
      };
    }
    default:
      return state;
  }
}


const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [{activeUser,boardTitle}, dispatch] = useReducer(reducer, initialState);

  function wssMessageHandler(message: any) {
    switch (message.type) {
      case wssMessageType.boardInfo: {
          dispatch({
           type: wssMessageType.boardInfo,
           payload: message.data
          })
      }
    }
  }

  return <BoardContext.Provider value={{
    activeUser,
    boardTitle,
    wssMessageHandler
  }}>{children}</BoardContext.Provider>;
};

function useBoard() {
    const context = useContext(BoardContext);
    if (context === undefined)
      throw new Error("BoardContext was used outside the BoardProvider");
    return context;
  }
  
  export { BoardProvider, useBoard };


