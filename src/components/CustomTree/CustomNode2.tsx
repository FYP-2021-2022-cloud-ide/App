import React, { useState, useRef, useCallback, useEffect } from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import FolderArrow from "./FolderArrow";
import { TypeIcon } from "./TypeIcon";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { isMobile } from "react-device-detect";
import { useCustomTree } from "./customTreeContext";

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
};

const CustomNode = (props: Props) => {
  const { node, depth, isOpen } = props;
  const { droppable } = node;
  const {
    ref: treeRef,
    onDragEnd,
    onDragStart,
    handleUpload,
    onClick,
    openContextMenu,
    getNodeActions,
    onToggle,
    changeLastActiveNode,
    openIdsRef,
  } = useCustomTree();
  /**
   * keep track on whether a file is dragged on top of this node
   * such that UI can highlight this node
   */
  const [dragOver, setDragOver] = useState(false);
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    multiple: true,
    maxSize: 1048576 * 30, // 30 MB
    onDragEnter: () => {
      setDragOver(true);
    },
    onDragLeave: () => {
      setDragOver(false);
    },
    onDrop: async (acceptedFiles, fileRejections, event) => {
      setDragOver(false);
      if (handleUpload)
        handleUpload(acceptedFiles, fileRejections, event, node);
    },
  });

  const Leading = useCallback(() => {
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
  }, [depth, droppable]);

  const _onClick = useCallback(async () => {
    changeLastActiveNode(node.id as string);
    if (onClick) await onClick(node);
  }, [onClick, node, changeLastActiveNode]);

  const onContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      changeLastActiveNode(node.id as string);
      if (getNodeActions)
        openContextMenu([e.clientX, e.clientY], getNodeActions(node, { open }));
    },
    [getNodeActions, openContextMenu, open, node]
  );

  const onDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      changeLastActiveNode(node.id as string);
      if (isMobile && getNodeActions)
        openContextMenu([e.clientX, e.clientY], getNodeActions(node, { open }));
    },
    [openContextMenu, getNodeActions, node, open]
  );

  const _onDragStart = useCallback(() => {
    changeLastActiveNode(node.id as string);
    if (onDragStart) onDragStart(node);
  }, [onDragStart, node]);

  const _onDragEnd = useCallback(() => {
    if (onDragEnd) onDragEnd(node);
  }, [onDragEnd, node]);

  const handleToggle = useCallback(async () => {
    await _onClick();
    const contain = openIdsRef.current.includes(node.id as string);
    if (contain) {
      openIdsRef.current = openIdsRef.current.filter((i) => i != node.id);
      treeRef.current.close([node.id]);
    } else {
      openIdsRef.current.push(node.id as string);
      treeRef.current.open(openIdsRef.current);
    }
    if (onToggle) await onToggle(node, !isOpen);
  }, [_onClick, onToggle, node, treeRef, openIdsRef]);

  const dropzoneRootProps = handleUpload ? getRootProps : {};

  return (
    <button
      {...dropzoneRootProps}
      onClick={_onClick}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
      onDragStart={_onDragStart}
      onDragEnd={_onDragEnd}
      draggable
      className={` flex flex-row items-center px-2 hover:bg-blue-200 dark:hover:bg-white/10 w-full ${
        dragOver && "bg-blue-200 dark:bg-gray-500"
      }`}
    >
      {handleUpload && <input {...getInputProps()} />}
      <Leading></Leading>
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
  );
};

export default React.memo(CustomNode, (prevProps, nextProps) => {
  return prevProps.isOpen == nextProps.isOpen;
});
