import React, { useState, useCallback } from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import FolderArrow from "./FolderArrow";
import { TypeIcon } from "./TypeIcon";
import { useDropzone } from "react-dropzone";
import { isMobile } from "react-device-detect";
import { useCustomTree } from "./customTreeContext";
import useCustomNode from "./useCustomNode";

export type CustomData = {
  /**
   * whether this is a file or directory
   */
  fileType?: "file" | "directory";
  fileSize?: string;
  /**
   * the full path of the file
   */
  filePath?: string;
};

export type Props = {
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

const CustomNode = (props: Props) => {
  const { node, depth, isOpen } = props;
  const {
    dropzoneRootProps,
    getInputProps,
    onClick,
    onContextMenu,
    onDragStart,
    onDragEnd,
    dragOver,
    handleToggle,
  } = useCustomNode(props);
  const { handleUpload } = useCustomTree();
  return (
    <button
      {...dropzoneRootProps}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
      className={` flex flex-row items-center px-2 hover:bg-blue-200 dark:hover:bg-white/10 w-full ${
        dragOver && "bg-blue-200 dark:bg-gray-500"
      }`}
    >
      {handleUpload && <input {...getInputProps()} />}
      <Leading droppable={node.droppable} depth={depth}></Leading>
      <FolderArrow
        open={isOpen}
        droppable={node.droppable}
        handleToggle={handleToggle}
      ></FolderArrow>
      <TypeIcon
        className={`w-6 h-6 text-gray-600 `}
        droppable={node.droppable}
        fileName={node.text}
        isOpen={isOpen}
      />
      <p className="truncate w-full text-left">{node.text}</p>
    </button>
  );
};

export default React.memo(CustomNode, (prevProps, nextProps) => {
  return prevProps.isOpen == nextProps.isOpen;
});
