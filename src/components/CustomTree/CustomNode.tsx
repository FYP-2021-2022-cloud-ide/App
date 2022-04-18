import React, { useState, useRef } from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import FolderArrow from "./FolderArrow";
import { TypeIcon } from "./TypeIcon";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { isMobile } from "react-device-detect";

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
  handleUpload?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
    node?: NodeModel<CustomData>
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
  handleUpload,
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
      if (handleUpload) {
        handleUpload(acceptedFiles, fileRejections, event);
      }
    },
  });
  const patchGetRootProps = () => {
    return handleUpload ? getRootProps() : {};
  };

  const handleToggle = async (event: React.MouseEvent) => {
    event.stopPropagation();
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
        {...patchGetRootProps()}
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={` flex flex-row items-center px-2 hover:bg-blue-200 dark:hover:bg-white/10 w-full ${
          dragOver && "bg-blue-200 dark:bg-gray-500"
        }`}
        // draggable={false}
        onContextMenu={(e: React.MouseEvent) => {
          if (!isMobile) {
            e.preventDefault();
            e.stopPropagation();
            onContextMenu(e);
          }
        }}
        onDoubleClick={(e) => {
          if (isMobile) {
            e.preventDefault();
            e.stopPropagation();
            onContextMenu(e);
          }
        }}
        draggable
      >
        {handleUpload ? <input {...getInputProps()} /> : <></>}
        <Leading depth={depth} droppable={node.droppable}></Leading>
        <FolderArrow
          open={isOpen}
          droppable={node.droppable}
          handleToggle={handleToggle}
        ></FolderArrow>
        <TypeIcon
          className={`w-6 h-6 text-gray-600 `}
          droppable={droppable}
          fileName={node.text}
          isOpen={isOpen}
        />

        <p className="truncate w-full text-left">{node.text}</p>
      </button>
    </>
  );
};

export default React.memo(CustomNode, (prevProps, nextProps) => {
  return prevProps.isOpen == nextProps.isOpen;
});
