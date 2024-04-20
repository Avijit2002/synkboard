import Image from "next/image";
import { logo2 } from "../../../../public/svgExport";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/nextjs";
type Props = {};

const EmptyPage = (props: Props) => {
  return (
    <div className="h-full grid place-content-center text-center">
      <Image src={logo2} alt="Logo" height={400} width={400} />
      <h1 className="text-[3rem] leading-[3.2rem] font-semibold mt-6">
        Welcome to Synkboard
      </h1>
      <p className="text-muted-foreground text-3xl mt-4">
        Create an organization to get started
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"myvar_3"} size={"xl"} className="mt-10 text-lg">
            Add Organisation
          </Button>
        </DialogTrigger>
        <DialogContent className='border-none p-0 bg-transparent'>
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmptyPage;
