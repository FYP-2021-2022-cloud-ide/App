import { DragLayerMonitorProps, NodeRender } from "@minoru/react-dnd-treeview";
import { useCallback, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { useDropzone } from "react-dropzone";
import CustomNode, { CustomData } from "./CustomNode";
import { useCustomTree as useCustomTreeContext } from "./customTreeContext";
import { CustomDragPreview } from "./CustomDragPreview";
import { Placeholder } from "./Placeholder";
import useDoubleClick from "../../hooks/useDoubleClick";

const useCustomTree = () => {
  const {
    rootId,
    data,
    handleUpload,
    openContextMenu,
    getRootActions,
    changeLastActiveNode,
  } = useCustomTreeContext();
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    multiple: true,
    maxSize: 1048576 * 30, // 30MB
    onDrop: async (acceptedFiles, fileRejections, event) => {
      if (handleUpload)
        await handleUpload(acceptedFiles, fileRejections, event);
    },
  });

  const onContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      changeLastActiveNode(rootId as string);
      if (getRootActions)
        openContextMenu(
          [event.clientX, event.clientY],
          getRootActions({
            open,
          })
        );
    },
    [openContextMenu, getRootActions, open]
  );

  const onClick = useDoubleClick({
    onSingleClick: (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (data.length == 0) {
        changeLastActiveNode(rootId as string);
        open();
      }
    },
    onDoubleClick: (event) => {
      event.preventDefault();
      event.stopPropagation();
      changeLastActiveNode(rootId as string);
      if (isMobile && getRootActions)
        openContextMenu(
          [event.clientX, event.clientY],
          getRootActions({ open })
        );
    },
  });

  const dropzoneRootProps = handleUpload ? getRootProps() : {};

  const render: NodeRender<CustomData> = useCallback((node, params) => {
    const { depth, isOpen } = params;
    return <CustomNode node={node} depth={depth} isOpen={isOpen}></CustomNode>;
  }, []);

  const classes = useMemo(() => {
    return {
      draggingSource: "opacity-30 ",
      dropTarget: "bg-blue-200/50 dark:bg-white/10",
    };
  }, [data]);

  const dragPreviewRender = useCallback(
    (monitorProps: DragLayerMonitorProps<CustomData>) => (
      <CustomDragPreview monitorProps={monitorProps} />
    ),
    []
  );

  const sort = useCallback((a, b) => {
    return a.text.localeCompare(b.text);
  }, []);

  const placeholderRender = useCallback(
    (node, { depth }) => <Placeholder node={node} depth={depth} />,
    []
  );
  return {
    openContextMenu,
    getRootActions,
    changeLastActiveNode,
    placeholderRender,
    sort,
    dragPreviewRender,
    classes,
    render,
    onClick,
    onContextMenu,
    getInputProps,
    dropzoneRootProps,
  };
};

export default useCustomTree;
