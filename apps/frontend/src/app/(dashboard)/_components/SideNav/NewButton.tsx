import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import ToolTip from "@/components/ToolTip";

type Props = {};

const NewButton = (props: Props) => {
  return (
    <div className=" bg-white/30 opacity-70 hover:opacity-100 transition rounded-lg aspect-square flex justify-center text-center">
      <Dialog>
        <DialogTrigger>
          <ToolTip label="add organiaion" side="right" align="start" sideOffset={30}>
            <Plus className="text-white" />
          </ToolTip>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewButton;
