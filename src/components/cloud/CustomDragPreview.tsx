import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { CustomData } from "./CustomNode";
import { TypeIcon } from "./TypeIcon";


type Props = {
    monitorProps: DragLayerMonitorProps<CustomData>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
    const item = props.monitorProps.item;

    return (
        <div className="flex flex-row space-x-2 bg-slate-500 rounded-lg p-2 items-center w-fit">
            <div className="">
                <TypeIcon droppable={item.droppable as boolean} fileType={item?.data?.fileType} className={"w-4 h-4 text-white"} />
            </div>
            <div className="text-white">{item.text}</div>
        </div>
    );
};
