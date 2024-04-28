import Image from "next/image";
import { logo2 } from "../../../../public/svgExport";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
type Props = {
  heading: string;
  label: string;
  image: string;
  buttonLabel?: string;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
};
const EmptyPage = ({
  heading,
  label,
  image,
  buttonLabel,
  size,
  children,
}: Props) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <Image
        src={image}
        alt="Image"
        height={400}
        width={400}
        className={cn({ "h-[300px] w-[300px]": size === "sm" })}
      />
      <h1 className="text-4xl font-semibold mt-6">{heading}</h1>
      <p className="text-muted-foreground text-2xl font-semibold mt-4">
        {label}
      </p>
      {buttonLabel ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"myvar_3"} size={"xl"} className="mt-10 text-lg">
              {buttonLabel}
            </Button>
          </DialogTrigger>

          {children}
        </Dialog>
      ) : null}
    </div>
  );
};

export default EmptyPage;
