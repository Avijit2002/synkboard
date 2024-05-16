"use client";

import { usernameToColor } from "@/lib/utils";
import { MousePointer2 } from "lucide-react";
import React, { memo } from "react";
import { useBoard } from "../../_context/BoardContext";

type Props = {
  userName: string;
  cursorLocation?: {
    x: number;
    y: number;
  };
};

const Cursor = memo(({ userName, cursorLocation }: Props) => {
  if (!cursorLocation) {
    return null;
  }
  const { x, y } = cursorLocation;

  console.log(x);
  return (
    <>
      <foreignObject
        // foreignObject used to embed html into svg
        style={{
          transform: `translateX(${x}px) translateY(${y}px)`,
        }}
        height={50}
        width={userName.length * 10 + 45}
        className="relative drop-shadow-md"
      >
        <MousePointer2
          className="h-5 w-5"
          style={{
            fill: usernameToColor(userName),
            color: usernameToColor(userName),
          }}
        />
        <div style={{
            color: usernameToColor(userName),
        }}>
            {userName}
        </div>
      </foreignObject>
    </>
  );
});

export default Cursor;
