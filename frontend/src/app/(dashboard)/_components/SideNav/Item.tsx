"use client";
import ToolTip from "@/components/ToolTip";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

type Props = {
  id: string;
  name: string;
  imageurl: string;
};

const Item = (props: Props) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  //console.log(organization)

  const isActive = organization?.id === props.id;

  //console.log(isActive)

  const onClick = () => {
    if (isActive) return;
    if (setActive) {
      setActive({ organization: props.id });
    }
  };
  return (
    <div className="aspect-square relative">
      <ToolTip label={props.name} side="right" align="start" sideOffset={20}>
        <Image
          fill
          src={props.imageurl}
          onClick={onClick}
          alt={props.name}
          className={cn(
            "rounded-md cursor-pointer opacity-60 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </ToolTip>
    </div>
  );
};

export default Item;
