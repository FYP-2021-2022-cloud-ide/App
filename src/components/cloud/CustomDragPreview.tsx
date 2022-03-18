import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { CustomData } from "./CustomNode";
import { TypeIcon } from "./TypeIcon";
import path from "path";

type Props = {
  monitorProps: DragLayerMonitorProps<CustomData>;
};

export const CustomDragPreview: React.FC<Props> = ({ monitorProps }: Props) => {
  const item = monitorProps.item;

  return (
    <div className="flex flex-row  bg-slate-500 rounded-lg py-1 px-2 items-center w-fit">
      <div className="">
        <TypeIcon
          droppable={item.droppable as boolean}
          fileName={path.basename(item.data.filePath)}
          className={"w-4 h-4 text-white"}
        />
      </div>
      <div className="text-white">{item.text}</div>
    </div>
  );
};
