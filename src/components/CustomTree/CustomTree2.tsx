import {
  DragLayerMonitorProps,
  NodeRender,
  Tree,
} from "@minoru/react-dnd-treeview";
import { useCallback, useEffect, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { useDropzone } from "react-dropzone";
import classNames from "../../lib/classnames";
import CustomNode, { CustomData } from "./CustomNode2";
import { CustomTreeProvider, Props, useCustomTree } from "./customTreeContext";
import styles from "../../styles/file_tree.module.css";
import { CustomDragPreview } from "./CustomDragPreview";
import { Placeholder } from "./Placeholder";

const Wrapped = () => {
  const {
    ref,
    treeId,
    rootId,
    data,
    openAll,
    closeAll,
    showGlobalActionButtons,
    handleUpload,
    openContextMenu,
    getRootActions,
    onDrop,
    nothingText,
    canDrop,
  } = useCustomTree();
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: data.length != 0,
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
  const onDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (isMobile && getRootActions)
        openContextMenu(
          [event.clientX, event.clientY],
          getRootActions({ open })
        );
    },
    [openContextMenu, getRootActions, open]
  );

  const dropzoneRootProps = handleUpload ? getRootProps() : {};

  const render: NodeRender<CustomData> = useCallback((node, params) => {
    const { depth, isOpen } = params;
    return <CustomNode node={node} depth={depth} isOpen={isOpen}></CustomNode>;
  }, []);

  const classes = useMemo(() => {
    return {
      root: classNames(styles, "root", data.length == 0 ? "root-nothing" : ""),
      draggingSource: "opacity-30 ",
      dropTarget: "bg-blue-200/50 dark:bg-white/10",
      listItem: "",
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

  return (
    <div id={treeId} className="tree">
      {showGlobalActionButtons ? (
        <div id="openids-handler" className="flex flex-row items-center">
          <button
            id="close-all-btn"
            disabled={data.length == 0}
            className="bg-gray-500 text-white px-4 h-5 text-xs rounded-md hover:bg-gray-600 mr-5 capitalize"
            onClick={openAll}
          >
            open all
          </button>
          <button
            id="open-all-btn"
            disabled={data.length == 0}
            className="bg-gray-500 text-white px-4 h-5 text-xs rounded-md hover:bg-gray-600 mr-5 capitalize"
            onClick={closeAll}
          >
            close all
          </button>
        </div>
      ) : (
        //   dummy div
        <div className="h-5 w-0"></div>
      )}
      {/* the tree  */}
      <div
        {...dropzoneRootProps}
        id="tree"
        className="h-full  min-h-[300px] max-h-[80vh] relative"
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
      >
        {/* the input will only exist if handle upload function is provided */}
        {handleUpload && <input type="file" {...getInputProps()} />}

        <Tree
          ref={ref}
          tree={data}
          rootId={rootId}
          onDrop={onDrop}
          canDrop={canDrop}
          render={render}
          classes={classes}
          //   onChangeOpen={onChangeOpen}
          dragPreviewRender={dragPreviewRender}
          sort={sort}
          placeholderRender={placeholderRender}
        ></Tree>
        {data.length == 0 && (
          <p className={classNames(styles, "root-nothing-text")}>
            {nothingText}
          </p>
        )}
      </div>
    </div>
  );
};

const CustomTree = (props: Props) => {
  return (
    <CustomTreeProvider {...props}>
      <Wrapped></Wrapped>
    </CustomTreeProvider>
  );
};

export default CustomTree;
