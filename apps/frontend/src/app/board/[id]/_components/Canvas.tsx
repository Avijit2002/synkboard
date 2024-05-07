"use Client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

type Props = {
  boardId: string
};

const Canvas = ({boardId}: Props) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />

    </main>
  );
};

export default Canvas;
