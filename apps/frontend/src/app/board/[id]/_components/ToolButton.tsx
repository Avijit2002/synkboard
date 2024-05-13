"use client";

import { LucideIcon } from "lucide-react";

import ToolTip from "@/components/ToolTip";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: Props) => {
  return (
    <ToolTip label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </ToolTip>
  );
};

export default ToolButton;
