import React from "react";
import ToolButton from "./ToolButton";
import { Circle, MousePointer2, Pencil, Redo, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react";

type Props = {};

const Toolbar = (props: Props) => {
  return (
    <div className="absolute top-1/2 left-3 -translate-y-1/2 p-3 flex flex-col gap-y-5 content-center items-center">
      <div className="shadow-sm rounded-md bg-white flex flex-col items-center gap-y-3 p-2 w-full">
        <ToolButton
         label="Select"
         icon={MousePointer2}
         onClick={()=>{}}
         isActive={false}
         isDisabled={true}
         />
         <ToolButton
         label="Text"
         icon={Type}
         onClick={()=>{}}
         isActive={false}
         isDisabled={false}
         />
          <ToolButton
         label="Sticky notes"
         icon={StickyNote}
         onClick={()=>{}}
         isActive={false}
         isDisabled={false}
         />
          <ToolButton
         label="Rectangle"
         icon={Square}
         onClick={()=>{}}
         isActive={false}
         isDisabled={false}
         />
          <ToolButton
         label="Elipse"
         icon={Circle}
         onClick={()=>{}}
         isActive={false}
         isDisabled={false}
         />
          <ToolButton
         label="Pen"
         icon={Pencil}
         onClick={()=>{}}
         isActive={false}
         isDisabled={false}
         />
      </div>
      <div className="shadow-sm rounded-md bg-white flex flex-col items-center gap-y-3 py-2 w-full">
      <ToolButton
         label="Undo"
         icon={Undo2}
         onClick={()=>{}}
         isActive={false}
         isDisabled={false}
         />
         <ToolButton
         label="Redo"
         icon={Redo2}
         onClick={()=>{}}
         isActive={false}
         isDisabled={false}
         />
      </div>
    </div>
  );
};

export default Toolbar;
