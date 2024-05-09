import React from "react";
import Canvas from "./_components/Canvas";
import { BoardProvider } from "./_context/BoardContext";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <BoardProvider>
      <Canvas boardId={params.id} />
    </BoardProvider>
  );
};

export default Page;
