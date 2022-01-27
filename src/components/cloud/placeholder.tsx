import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";

type Props = {
    node: NodeModel;
    depth: number;
}

export const Placeholder: React.FC<Props> = (props) => {
    return (
        <div className="h-[1px] w-full relative">
            <div className="bg-blue-600 w-full h-[1px] -translate-y-1/2 absolute"></div>
        </div>
    )
};
