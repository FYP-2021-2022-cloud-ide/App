import React, { useState, useRef } from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import FolderArrow from "./FolderArrow";
import { TypeIcon } from "./TypeIcon";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import path from "path";

export type CustomData = {
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  filePath?: string;
};

type Props = {
  /**
   * the data of this node
   */
  node: NodeModel<CustomData>;
  /**
   * the depth of this node in tree view
   */
  depth: number;
  /**
   * whether this node is open
   */
  isOpen: boolean;
  /**
   * handle dropping of files into this node
   * @param
   */
  handleDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  /**
   * This is called when the folder arrow is clicked (when a folder is expanded or collapsed)
   */
  onToggle: () => void;
  /**
   * This is called when file button is clicked.
   */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * this will be called when a node dragging start
   */
  onDragStart?: () => void;
  /**
   * this will be called when the node dragging is end
   */
  onDragEnd?: () => void;
  /**
   * this will be called when right click on node
   */
  onContextMenu?: (event: React.MouseEvent) => void;
};

const CustomNode: React.FC<Props> = ({
  isOpen,
  depth,
  handleDrop,
  onClick,
  onDragStart,
  onDragEnd,
  onContextMenu,
  onToggle,
  node,
}: Props) => {
  const { droppable, data } = node;
  const [dragOver, setDragOver] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    onDragEnter: () => {
      setDragOver(true);
    },
    onDragLeave: () => {
      setDragOver(false);
    },
    onDrop: async (acceptedFiles, fileRejections, event) => {
      setDragOver(false);
      if (handleDrop) {
        handleDrop(acceptedFiles, fileRejections, event);
      }
    },
  });

  const handleToggle = async (event: React.MouseEvent) => {
    console.log("arrow is click , handle toggle");
    event.stopPropagation();
    // nodeOpenRef.current[node.id] = !nodeOpenRef.current[node.id]
    onToggle();
    onClick(event);
  };

  const Leading = ({
    depth,
    droppable,
  }: {
    depth: number;
    droppable: boolean;
  }) => {
    if (depth == 0 && !droppable)
      return <div className="w-[24px] h-[24px] min-w-[24px]"></div>;
    return (
      <>
        {Array(depth)
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={index}
                className="w-[24px] h-[24px] relative min-w-[24px]"
              >
                <div className="absolute h-full w-[1px] bg-gray-400 left-[50%]"></div>
              </div>
            );
          })}
      </>
    );
  };

  return (
    <>
      <button
        {...getRootProps()}
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={` flex flex-row items-center px-2 hover:bg-blue-200 dark:hover:bg-white/10 w-full ${
          dragOver && "bg-blue-200 dark:bg-gray-500"
        }`}
        // draggable={false}
        onContextMenu={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          onContextMenu(e);
        }}
        draggable
      >
        <input {...getInputProps()} />
        <Leading depth={depth} droppable={node.droppable}></Leading>
        <FolderArrow
          open={isOpen}
          droppable={node.droppable}
          handleToggle={handleToggle}
        ></FolderArrow>
        <TypeIcon
          className={`w-6 h-6 text-gray-600 `}
          fileName={data?.fileName}
          droppable={droppable}
          isOpen={isOpen}
          extension={path.extname(data?.fileName as string)}
        />

        <p className="truncate w-full text-left">{node.text}</p>
      </button>
    </>
  );
};

export default React.memo(CustomNode, (prevProps, nextProps) => {
  return prevProps.isOpen == nextProps.isOpen;
});
