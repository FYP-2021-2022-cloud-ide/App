/**
 * file upload stages :
 * 1. user drop a file to upload on browser
 * 2. browser prepare the files
 * 3. browser call the API to upload files
 * 4. get the response from API
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
import useComponentVisible from "./useComponentVisible";
import { CustomDragPreview } from "./CustomDragPreview";
import { Placeholder } from "./placeholder";
import { useState, useEffect, useRef } from "react";
import React from "react";
import styles from "../../styles/file_tree.module.css";
import classNames from "../../lib/classnames";
import { Dialog, Transition } from "@headlessui/react";

export type Props = {
  handleDropzone?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
    node?: NodeModel<CustomData>
  ) => Promise<NodeModel<CustomData>[]>;
  rootId?: string | number;
  /**
   * this callback will be called on drop but is called before react dropzone prepare the files. This callback is called before stage 2.
   */
  fastDropCallback?: () => void;
  /**
   *  will only be called in the target tree if cross-tree moving
   */
  handleMoveWithinTree?: (
    newTreeData: NodeModel<CustomData>[],
    options: DropOptions<CustomData>
  ) => Promise<NodeModel<CustomData>[]>;
  // by default the tree does not know the existence of another tree, so we need to handle the logic outside the tree
  handleMoveFromAnotherTree?: (
    treeData: NodeModel<CustomData>[],
    dropTarget: NodeModel<CustomData>
  ) => Promise<NodeModel<CustomData>[]>;
  handleOpenAll?: () => void;
  handleCloseAll?: () => void;

  /**
   * the source of files in the tree. This function will be wrapped by a function `getFilesAndReset`.
   * The function is called on component mount or specific call
   */
  getFiles: () => Promise<NodeModel<CustomData>[]>;
  createFolder?: (
    node: NodeModel<CustomData>,
    name: string
  ) => Promise<NodeModel<CustomData>[]>;
  duplicate?: (node: NodeModel<CustomData>) => Promise<NodeModel<CustomData>[]>;
  getInfo?: (node: NodeModel<CustomData>) => Promise<any>;
  remove?: (node: NodeModel<CustomData>) => Promise<NodeModel<CustomData>[]>;
  edit?: (
    node: NodeModel<CustomData>,
    newName: string
  ) => Promise<NodeModel<CustomData>[]>;
  download?: (node: NodeModel<CustomData>) => Promise<void>;
  onClick?: (
    treeData: NodeModel<CustomData>[],
    node: NodeModel<CustomData>
  ) => Promise<void> | Promise<NodeModel<CustomData>[]>;
  onDragStart?: (
    treeData: NodeModel<CustomData>[],
    node: NodeModel<CustomData>
  ) => Promise<void>;
  onDragEnd?: (
    treeData: NodeModel<CustomData>[],
    node: NodeModel<CustomData>
  ) => Promise<void>;
  progressRef: React.MutableRefObject<any>;
  canDrop?: (
    tree: NodeModel<CustomData>[],
    options: DropOptions<CustomData>
  ) => boolean | void;
  nothingText?: string;
  getNodeActions?: (
    node: NodeModel<CustomData>
  ) => { text: string; onClick: () => void }[];
  rootActions?: { text: string; onClick: () => void }[];
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
 * this type is for exporting a ref to the FTree component
 */
export type MyTreeMethods = TreeMethods & {
  getFilesAndReset(data?: NodeModel<CustomData>[]): Promise<void>;
};

const FTree = React.forwardRef(
  (
    {
      fastDropCallback,
      rootId,
      canDrop,
      handleDropzone,
      handleMoveWithinTree,
      handleMoveFromAnotherTree,
      handleCloseAll,
      handleOpenAll,
      getFiles,
      createFolder,
      onDragStart,
      onDragEnd,
      duplicate,
      getInfo,
      remove,
      edit,
      download,
      onClick,
      progressRef,
      nothingText = "Click or drop files to upload",
      getNodeActions,
      rootActions,
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
          await getFilesAndReset(data);
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
    const [menuItems, setMenuItems] = useState<
      { text: string; onClick: () => void }[]
    >([]);

    async function getFilesAndReset(data?: NodeModel<CustomData>[]) {
      console.log("get files");
      if (!data) {
        data = await getFiles();
      }
      if (data != undefined) {
        if (JSON.stringify(treeData) === JSON.stringify(data)) {
          // console.log("data is the same, rerender omitted ")
        } else {
          // console.log("data is different, rerender...")
          setTreeData(data);
        }
      } else console.error("Tree data is undefined");
    }

    useEffect(() => {
      getFilesAndReset();
    }, []);
    useEffect(() => {
      ref.current = {
        ...ref.current,
        getFilesAndReset,
      };
      console.log("rerender");
    });

    const ButtonGroups = () => {
      return (
        <>
          {handleOpenAll ? (
            <button
              disabled={treeData.length == 0}
              className="bg-gray-500 text-white px-4 h-5 text-xs rounded-md hover:bg-gray-600 mr-5 capitalize"
              onClick={() => {
                ref.current.openAll();
                nodeOpenRef.current = treeData
                  .filter((node) => node.droppable)
                  .map((node) => String(node.id));
              }}
            >
              open all
            </button>
          ) : (
            <div className="h-5 w-0"></div>
          )}
          {handleCloseAll ? (
            <button
              disabled={treeData.length == 0}
              className="bg-gray-500 text-white px-4 h-5 text-xs rounded-md hover:bg-gray-600 mr-5 capitalize"
              onClick={() => {
                ref.current.closeAll();
                nodeOpenRef.current = [];
              }}
            >
              close all
            </button>
          ) : (
            // a dummy div as padding
            <div className="h-5 w-0"></div>
          )}
        </>
      );
    };

    return (
      <div
        className={classNames(styles, "wrapper")}
        onContextMenu={(event: React.MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();
          setIsMenuVisible(true);
          setMenuLocation([event.clientX, event.clientY]);
          setMenuItems(rootActions);
        }}
      >
        <div className="flex flex-row items-center ">
          <ButtonGroups></ButtonGroups>
          <Progress ref={progressRef} />
        </div>
        <div className="h-full " onDrop={fastDropCallback}>
          <div
            {...getRootProps()}
            className="h-full  min-h-[300px] max-h-[80vh] relative"
          >
            <input
              type="file"
              multiple
              // directory=""
              // webkitdirectory=""
              {...getInputProps()}
            />

            <Tree
              ref={ref}
              tree={treeData}
              rootId={rootId ?? 0}
              onDrop={async (
                newTreeData: NodeModel<CustomData>[],
                {
                  dragSourceId,
                  dropTargetId,
                  dragSource,
                  dropTarget,
                }: DropOptions<CustomData>
              ) => {
                // if the target parent is the same as old parent , just refresh the UI
                if (dragSource == undefined) {
                  // from another tree
                  const data = await handleMoveFromAnotherTree(
                    newTreeData,
                    dropTarget
                  );
                  await getFilesAndReset(data);
                  return;
                }
                if (dragSource.id == dropTarget?.id) {
                  // do nothing
                  // setTreeData(newTreeData)
                  return;
                }
                const data = await handleMoveWithinTree(newTreeData, {
                  dragSourceId,
                  dropTargetId,
                  dragSource,
                  dropTarget,
                });
                await getFilesAndReset(data);
              }}
              initialOpen={false}
              canDrop={canDrop}
              onChangeOpen={(newOpenIds) => {}}
              render={(
                node,
                { depth, isOpen, onToggle, hasChild, draggable }
              ) => {
                return (
                  <CustomNode
                    node={node as NodeModel<CustomData>}
                    depth={depth}
                    // ui isopen
                    isOpen={isOpen}
                    handleDrop={handleDropzone}
                    onToggle={async (node) => {
                      const { id } = node;
                      lastActiveNodeRef.current = id as string;
                      if (nodeOpenRef.current == undefined) {
                        nodeOpenRef.current = [];
                      }
                      // console.log("past: ", nodeOpenRef.current, "toggle : ", nodeRef.current)
                      const contain = nodeOpenRef.current.includes(
                        id as string
                      );
                      if (contain) {
                        nodeOpenRef.current = nodeOpenRef.current.filter(
                          (i) => i != id
                        );
                        ref.current.close([id]);
                      } else {
                        nodeOpenRef.current.push(id as string);
                        ref.current.open(nodeOpenRef.current);
                      }
                    }}
                    download={download}
                    onClick={
                      onClick &&
                      ((node) => {
                        return onClick(treeData, node);
                      })
                    }
                    onContextMenu={async (node, event) => {
                      setIsMenuVisible(true);
                      setMenuLocation([event.clientX, event.clientY]);
                      setMenuItems(getNodeActions(node));
                    }}
                    onDragStart={
                      onDragStart &&
                      ((node) => {
                        return onDragStart(treeData, node);
                      })
                    }
                    onDragEnd={
                      onDragEnd &&
                      ((node) => {
                        return onDragEnd(treeData, node);
                      })
                    }
                    getFilesAndReset={getFilesAndReset}
                    createFolder={createFolder}
                    duplicate={duplicate}
                    edit={edit}
                    remove={remove}
                    getInfo={getInfo}
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
        </div>
        <Transition
          show={isMenuVisible}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog
            ref={menuRef}
            onClose={() => {
              setIsMenuVisible(false);
            }}
            style={{
              left: menuLocation[0] + "px",
              top: menuLocation[1] + "px",
            }}
            className="z-10 shadow-lg rounded-md left-[100%] absolute bg-white p-2 dark:bg-gray-700 text-gray-600 dark:text-gray-200 w-fit"
          >
            <div className="flex flex-col">
              {menuItems
                .sort((a, b) => a.text.localeCompare(b.text))
                .map((i) => {
                  return (
                    <button
                      key={i.text}
                      onClick={() => {
                        setIsMenuVisible(false);
                        i.onClick();
                      }}
                      className="hover:bg-gray-200 dark:hover:bg-gray-500 rounded  px-2 text-left whitespace-nowrap capitalize"
                    >
                      {i.text}
                    </button>
                  );
                })}
            </div>
          </Dialog>
        </Transition>
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
