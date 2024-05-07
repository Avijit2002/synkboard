import React from "react";

type Props = {};

const Toolbar = (props: Props) => {
  return (
    <div className="absolute top-1/2 left-3 -translate-y-1/2 p-3 flex flex-col gap-y-5 content-center items-center">
      <div className="shadow-sm rounded-md bg-white flex flex-col items-center gap-y-3 p-2 w-full">
        <p>Arrow</p>
        <p>Square</p>
      </div>
      <div className="shadow-sm rounded-md bg-white flex flex-col items-center gap-y-3 py-2 w-full">
        <p>Undo</p>
        <p>Redo</p>
      </div>
    </div>
  );
};

export default Toolbar;
