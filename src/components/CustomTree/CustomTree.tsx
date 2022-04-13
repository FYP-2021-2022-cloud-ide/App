/**
 * file upload stages :
 * 1. user drop a file to upload on browser
 * 2. browser prepare the files
 * 3. browser call the API to upload files
 * 4. get the response from API
 *
 */

import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import {
  DragLayerMonitorProps,
  NodeModel,
  Tree,
  DropOptions,
  TreeMethods,
} from "@minoru/react-dnd-treeview";
import CustomNode, { CustomData } from "./CustomNode";
import useComponentVisible from "../../hooks/useComponentVisible";
import { CustomDragPreview } from "./CustomDragPreview";
import { Placeholder } from "./placeholder";
import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import styles from "../../styles/file_tree.module.css";
import classNames from "../../lib/classnames";
import ContextMenu, { MenuItem } from "./ContextMenu";
import _ from "lodash";

export type Props = {
  /**
   * this function is for dnd upload files. The div wrappering the tree view is a dropzone. Each button of file is also a dropzone.
   * `node` is passed as parameter if the upload target is a node. Otherwise, `node`  will be undefined.
   */
  handleDropzone?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
    node?: NodeModel<CustomData>
  ) => Promise<NodeModel<CustomData>[]>;
  /**
   * a custom root id. If this is undefined, rootId is 0.
   * The root id is the parent of files in the first layer. Therefore, it make sense to set this as the root directory path.
   */
  rootId?: string | number;
  /**
   *  will only be called in the target tree if in-tree moving. Return the new tree data such that the tree will rerender base on this data.
   *
   * @param treeData the treeData that suppose to be after this move
   * @param options Note that `dropTarget` is `undefined` if the the target is root. Else it is the id of the target node.
   * @returns the new tree
   */
  handleMoveWithinTree?: (
    treeData: NodeModel<CustomData>[],
    options: DropOptions<CustomData>
  ) => Promise<NodeModel<CustomData>[]>;
  /**
   * by default each tree does not know the existence of another tree, so we need to handle the logic outside the tree.
   * Return the new tree data suhch that the tree will rerender base on this data.
   *
   * @param treeData
   * @param dropTarget target is `undefined` if moving to root. Else target is the id of the target node. Therefore in your dnd, you need to handle 3 cases:
   *
   * 1. `dropTarget` is `undefined`
   * 2. `dropTarget` is the a directory
   * 3. `dropTarget` is a file
   * @returns the new tree
   */
  handleMoveFromAnotherTree?: (
    treeData: NodeModel<CustomData>[],
    dropTarget: NodeModel<CustomData>
  ) => Promise<NodeModel<CustomData>[]>;
  /**
   * The source of files in the tree. This function will be wrapped by a function `getFilesAndRerender`.
   * The function is called on component mount or specific call.
   */
  getFiles: () => NodeModel<CustomData>[] | Promise<NodeModel<CustomData>[]>;
  /**
   * this is called when the directory is toggled
   */
  onToggle?: (node: NodeModel<CustomData>) => void | Promise<void>;
  /**
   * call when the node is clicked
   */
  onClick?: (
    treeData: NodeModel<CustomData>[],
    node: NodeModel<CustomData>
  ) => void;
  /**
   * called when a node is started to be dragged
   */
  onDragStart?: (
    treeData: NodeModel<CustomData>[],
    node: NodeModel<CustomData>
  ) => Promise<void>;
  /**
   * called when a node dragging is ended
   */
  onDragEnd?: (
    treeData: NodeModel<CustomData>[],
    node: NodeModel<CustomData>
  ) => Promise<void>;
  /**
   * This is a ref to the progress text
   */
  progressRef: React.MutableRefObject<string>;
  /**
   * This is just a forward props of the original Tree component.
   * This callback is used to check whether the a node can drag and drop within tree or cross-tree.
   */
  canDrop?: (
    tree: NodeModel<CustomData>[],
    options: DropOptions<CustomData>
  ) => boolean | void;
  /** a dummy text showing on UI when there is no file in the tree */
  nothingText?: string;
  /**
   * given a node, return a list of actions such that can be shown on the context menu
   */
  getNodeActions?: (node?: NodeModel<CustomData>) => MenuItem[];
  /**
   * a list of actions shown on context menu when right click on root
   */
  rootActions?: MenuItem[];
  /**
   * this will be called when the context menu is closed
   */
  onContextMenuClose?: () => void;
  /**
   * buttons like `open all` and `close all` are shown above the tree view.
   * By default, this is `true`. Hide the buttons by setting `false`.
   * Hidding the button is useful when the fetching of treeData is done folder-by-folder (for example, the data are from remote storage).
   * The tree data will never reveal the complete directory tree and therefore operations such as `open all` does not make sense.
   */
  showGlobalActionButtons?: boolean;
};

/**
 * this is a progress text component
 */
const Progress = React.forwardRef((_, ref: any) => {
  const [progress, setProgress] = useState<any>(ref.current);
  useEffect(() => {
    setInterval(() => {
      if (progress != ref.current) setProgress(ref.current);
    }, 100);
  });
  return (
    <>
      {progress && (
        <p
          id="progress-text"
          className="text-gray-600 text-sm dark:text-gray-300"
        >
          {progress}
        </p>
      )}
    </>
  );
});

/**
 * this type is for exporting a ref to the FTree component. For example, you can access the `getFilesAndRerender` function by `ref.current.getFilesAndRerender`
 */
export type MyTreeMethods = TreeMethods & {
  /**
   * this function is a reference to the `getFilesAndRerender` function in the `FTree` component, which is a wrapper of the tree's `getFiles` function. When this function is called, the tree is forced to fetch data and render.
   * If data is provided, no fetching will be done. The tree will rerender directly based on the data supplied.
   *
   * @remarks
   * normally, you don't need to call this function by manually because this function is used internally in the component.
   * This function is called on `FTree` component mount and after an action that could change the tree data.
   * One occasion that you might need to access this using ref is that when the context menu actions require getFilesAndRerender.
   * As the context menu actions are added dynamically, the rerender need to be handled by user.
   *
   * @param data
   */
  getFilesAndRerender(data?: NodeModel<CustomData>[]): Promise<void>;
  rootId: string | number;
};

/**
 * the buttons components
 */
const ButtonGroups = ({
  handleOpenAll,
  handleCloseAll,
  treeData,
}: {
  handleOpenAll?: () => void;
  handleCloseAll?: () => void;
  treeData: NodeModel<CustomData>[];
}) => {
  return (
    <>
      <button
        disabled={treeData.length == 0}
        className="bg-gray-500 text-white px-4 h-5 text-xs rounded-md hover:bg-gray-600 mr-5 capitalize"
        onClick={handleOpenAll}
      >
        open all
      </button>
      <button
        disabled={treeData.length == 0}
        className="bg-gray-500 text-white px-4 h-5 text-xs rounded-md hover:bg-gray-600 mr-5 capitalize"
        onClick={handleCloseAll}
      >
        close all
      </button>
    </>
  );
};

/**
 * this is a custom tree view component based on https://github.com/minop1205/react-dnd-treeview
 *
 * This component expose a `getFiles` function which is used to get the tree data.
 * The data should be stored outside the side the component, either client side or server side.
 * This component will get files from source and rerender in the following times:
 *
 * 1. component mount
 * 2. an actions that could change the tree. For example, upload files, moving of nodes.
 *
 * @remarks
 * The tree will not rerender on a custom action even when it could possibly change the tree. The rerender will to be triggered manually by calling `ref.current.getFilesAndRerender` .
 */
const FTree = React.forwardRef(
  (
    {
      rootId,
      canDrop,
      handleDropzone,
      handleMoveWithinTree,
      handleMoveFromAnotherTree,
      getFiles,
      onDragStart,
      onDragEnd,
      onToggle,
      onClick,
      progressRef,
      nothingText = "Click or drop files to upload",
      getNodeActions,
      rootActions,
      onContextMenuClose,
      showGlobalActionButtons = true,
    }: Props,
    ref: React.MutableRefObject<MyTreeMethods>
  ) => {
    const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>(
      [] as NodeModel<CustomData>[]
    );
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      noClick: treeData.length != 0,
      onDrop: async (acceptedFiles, fileRejections, event) => {
        if (handleDropzone) {
          // console.log(treeData.length && treeData.length == 0)
          const data = await handleDropzone(
            acceptedFiles,
            fileRejections,
            event
          );
          await getFilesAndRerender(data);
        }
      },
    });

    const lastActiveNodeRef = useRef<string>();
    const nodeOpenRef = useRef<string[]>();
    const {
      ref: menuRef,
      isComponentVisible: isMenuVisible,
      setIsComponentVisible: setIsMenuVisible,
    } = useComponentVisible(false);
    const [menuLocation, setMenuLocation] = useState([0, 0]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    async function getFilesAndRerender(data?: NodeModel<CustomData>[]) {
      if (!data) {
        data = await getFiles();
      }
      if (data != undefined) {
        if (_.isEqual(treeData, data)) {
          // console.log("data is the same, rerender omitted ");
        } else {
          // console.log("data is different, rerender...")
          setTreeData(data);
        }
      } else console.error("Tree data is undefined");
    }

    const temp = useCallback((...args) => {
      ref.current = Object.assign(ref.current ? ref.current : {}, {
        ...args[0],
        getFilesAndRerender: getFilesAndRerender,
        rootId: rootId ?? 0,
      });
    }, []);

    useEffect(() => {
      getFilesAndRerender();
    }, []);

    return (
      <div className={classNames(styles, "wrapper")}>
        {/* the buttons and progress text */}
        <div className="flex flex-row items-center ">
          {showGlobalActionButtons ? (
            <ButtonGroups
              handleCloseAll={() => {
                nodeOpenRef.current = [];
                ref.current.closeAll();
              }}
              handleOpenAll={() => {
                nodeOpenRef.current = treeData
                  .filter((node) => node.droppable)
                  .map((node) => String(node.id));
                ref.current.openAll();
              }}
              treeData={treeData}
            ></ButtonGroups>
          ) : (
            <div className="h-5 w-0"></div>
          )}
          <Progress ref={progressRef} />
        </div>
        {/* the tree */}
        <div
          {...getRootProps()}
          className="h-full  min-h-[300px] max-h-[80vh] relative"
          onContextMenu={(event: React.MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            if (rootActions) {
              setIsMenuVisible(true);
              setMenuLocation([event.clientX, event.clientY]);
              setMenuItems(rootActions);
            }
          }}
        >
          {handleDropzone ? (
            <input
              type="file"
              multiple
              // directory=""
              // webkitdirectory=""
              {...getInputProps()}
            />
          ) : (
            <></>
          )}

          <Tree
            ref={temp}
            tree={treeData}
            rootId={rootId ?? 0}
            onDrop={async (
              tree: NodeModel<CustomData>[],
              {
                dragSourceId,
                dropTargetId,
                dragSource,
                dropTarget,
              }: DropOptions<CustomData>
            ) => {
              if (dragSource == undefined) {
                // from another tree
                const data = await handleMoveFromAnotherTree(tree, dropTarget);
                await getFilesAndRerender(data);
                return;
              }
              if (dragSource.id == dropTarget?.id) {
                // if the target parent is the same as old parent , there is no moving of files, so just refresh the UI
                return;
              }
              const data = await handleMoveWithinTree(tree, {
                dragSourceId,
                dropTargetId,
                dragSource,
                dropTarget,
              });
              await getFilesAndRerender(data);
            }}
            initialOpen={false}
            canDrop={canDrop}
            onChangeOpen={(newOpenIds) => {
              // this function is called internally in the tree component when node expand or collapse.
            }}
            render={(node, params) => {
              const { depth, isOpen } = params;
              return (
                <CustomNode
                  node={node}
                  depth={depth}
                  // ui isopen
                  isOpen={isOpen}
                  handleDrop={
                    handleDropzone
                      ? async (acceptedFiles, fileRejections, event) => {
                        const data = await handleDropzone(
                          acceptedFiles,
                          fileRejections,
                          event,
                          node
                        );
                        await getFilesAndRerender(data);
                      }
                      : undefined
                  }
                  onToggle={async () => {
                    // we don't use the internal onToggle function because seems to have bugs.
                    const { id } = node;
                    lastActiveNodeRef.current = id as string;
                    if (nodeOpenRef.current == undefined) {
                      nodeOpenRef.current = [];
                    }
                    const contain = nodeOpenRef.current.includes(id as string);
                    if (contain) {
                      nodeOpenRef.current = nodeOpenRef.current.filter(
                        (i) => i != id
                      );
                      ref.current.close([id]);
                    } else {
                      nodeOpenRef.current.push(id as string);
                      ref.current.open(nodeOpenRef.current);
                    }
                    if (onToggle) {
                      await onToggle(node);
                    }
                  }}
                  onClick={() => {
                    if (onClick) onClick(treeData, node);
                  }}
                  onContextMenu={(event) => {
                    if (getNodeActions) {
                      setIsMenuVisible(true);
                      setMenuLocation([event.clientX, event.clientY]);
                      setMenuItems(getNodeActions(node));
                    }
                  }}
                  onDragStart={() => onDragStart(treeData, node)}
                  onDragEnd={() => onDragEnd(treeData, node)}
                />
              );
            }}
            classes={{
              root: classNames(
                styles,
                "root",
                treeData.length == 0 ? "root-nothing" : ""
              ),
              draggingSource: "opacity-30 ",
              dropTarget: "bg-blue-200/50 dark:bg-white/10",
              listItem: "",
            }}
            dragPreviewRender={(
              monitorProps: DragLayerMonitorProps<CustomData>
            ) => <CustomDragPreview monitorProps={monitorProps} />}
            sort={(a, b) => {
              return a.text.localeCompare(b.text);
            }}
            placeholderRender={(node, { depth }) => (
              <Placeholder node={node} depth={depth} />
            )}
          ></Tree>
          {treeData.length == 0 && (
            <p className={classNames(styles, "root-nothing-text")}>
              {nothingText}
            </p>
          )}
        </div>
        {menuItems && menuItems.length != 0 && (
          <ContextMenu
            ref={menuRef}
            isMenuVisible={isMenuVisible}
            setIsMenuVisible={setIsMenuVisible}
            menuItems={menuItems}
            menuLocation={menuLocation}
            onClose={onContextMenuClose}
          />
        )}
      </div>
    );
  }
);

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string; // remember to make these attributes optional....
    webkitdirectory?: string;
  }
}

export default FTree;
