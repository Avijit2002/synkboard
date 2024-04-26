import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {};

const InviteButton = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className='h-12'>
          <Plus className="aspect-square mr-2" />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0 bg-transparent border-none max-w-[900px]'>
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
