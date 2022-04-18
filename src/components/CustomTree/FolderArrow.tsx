import React from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";

const FolderArrow = React.memo(
  ({
    open,
    droppable,
    handleToggle,
  }: {
    open: boolean;
    droppable: boolean;
    handleToggle: (event: React.MouseEvent) => void | Promise<void>;
  }) => {
    const Arrow = open ? ChevronDownIcon : ChevronRightIcon;
    if (!droppable) return <></>;
    return (
      <div
        className="w-[24px] h-[24px] min-w-[24px] relative"
        onClick={handleToggle}
      >
        <Arrow className="openArrow" />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.open === nextProps.open;
  }
);

export default FolderArrow;
