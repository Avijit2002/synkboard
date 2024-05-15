"use client";

import { memo } from "react"; // to minimize waste rerenders
import { useBoard } from "../../_context/BoardContext";
import Cursor from "./Cursor";

type Props = {};

const Cursors = () => {
  const { activeUsers } = useBoard()!;

  return (
    <>
      {activeUsers?.map((user) => (
        <Cursor key={Math.random()} userName={user.userName} cursorLocation={user.cursorLocation} />
      ))}
    </>
  );
};



const CursorsPresence = memo((props: Props) => {
  return (
    <>
      {/* TODO: Draft pencil, realtime show what other user is drawing */}
      <Cursors />
    </>
  );
});

export default CursorsPresence;
