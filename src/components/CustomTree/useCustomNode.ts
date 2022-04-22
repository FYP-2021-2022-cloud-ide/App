import React, { useCallback, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDropzone } from "react-dropzone";
import { useCustomTree } from "./customTreeContext";
import { Props } from "./CustomNode";
import useDoubleClick from "../../hooks/useDoubleClick";
import useOnClick from "../../hooks/useOnClick";

const useCustomNode = (props: Props) => {
  const { node, isOpen } = props;
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

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const unfocus: (e: MouseEvent, inside: boolean) => void = useCallback(
    (e, inside) => {
      setIsFocus(inside);
    },
    []
  );

  const { ref } = useOnClick<HTMLButtonElement>(unfocus);

  const onSingleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      changeLastActiveNode(node.id as string);
      if (onClick) await onClick(node);
    },
    [onClick, changeLastActiveNode, node]
  );

  const onDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    changeLastActiveNode(node.id as string);
    if (isMobile && getNodeActions)
      openContextMenu([e.clientX, e.clientY], getNodeActions(node, { open }));
  }, []);

  const _onClick = useDoubleClick({
    onSingleClick: onSingleClick,
    onDoubleClick: onDoubleClick,
  });

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

  const _onDragStart = useCallback(() => {
    changeLastActiveNode(node.id as string);
    if (onDragStart) onDragStart(node);
  }, [onDragStart, node]);

  const _onDragEnd = useCallback(() => {
    if (onDragEnd) onDragEnd(node);
  }, [onDragEnd, node]);

  const handleToggle = useCallback(
    async (e) => {
      await onSingleClick(e);
      const contain = openIdsRef.current.includes(node.id as string);
      if (contain) {
        openIdsRef.current = openIdsRef.current.filter((i) => i != node.id);
        treeRef.current.close([node.id]);
      } else {
        openIdsRef.current.push(node.id as string);
        treeRef.current.open(openIdsRef.current);
      }
      if (onToggle) await onToggle(node, !isOpen);
    },
    [_onClick, onToggle, node, treeRef, openIdsRef]
  );

  const dropzoneRootProps = handleUpload ? getRootProps : {};
  return {
    dropzoneRootProps,
    onClick: _onClick,
    onContextMenu,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    dragOver,
    getInputProps,
    handleToggle,
    isFocus,
    ref,
  };
};

export default useCustomNode;
