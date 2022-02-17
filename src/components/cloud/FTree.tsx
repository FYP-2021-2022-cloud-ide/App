import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import {
  DragLayerMonitorProps,
  NodeModel,
  Tree,
  getDescendants,
  DropOptions,
  TreeMethods,
  useOpenIdsHelper,
} from "@minoru/react-dnd-treeview";
import CustomNode, { CustomData } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { Placeholder } from "./placeholder";
import { useState, useEffect, useRef } from "react";
import React from "react";

export type Props = {
  disabled?: boolean;
  handleDropzone?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
    node?: NodeModel<CustomData>
  ) => Promise<NodeModel<CustomData>[]>;
  rootId?: string | number;
  // this callback will be called on drop but is called before react dropzone prepare the files
  fastDropCallback?: () => void;
  //  will only be called in the target tree if cross-tree moving
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
};

const Progress = React.forwardRef((_, ref: any) => {
  const [progress, setProgress] = useState<any>(ref.current);
  useEffect(() => {
    setInterval(() => {
      if (progress != ref.current) setProgress(ref.current);
    }, 100);
  });
  return (
    <>
      {
        // progress == 100 ? <p className="text-gray-600 text-sm dark:text-gray-300">Transferring files in the backend...</p> :
        //     <p className="text-sm text-gray-600 dark:text-gray-300" style={{ display: progress == 0 ? "none" : "block" }}>Uploading files...</p>
        // <div className="w-36 bg-gray-300 dark:bg-white h-2 rounded overflow-hidden" style={{ display: progress == 0 ? "none" : "block" }}>
        //     <div className={`bg-green-400 h-full`} style={{ width: `${progress}%` }}></div>
        // </div>
        progress && (
          <p className="text-gray-600 text-sm dark:text-gray-300">{progress}</p>
        )
      }
    </>
  );
});

const FTree = React.forwardRef(
  (
    {
      disabled = false,
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
      nothingText = "No files",
    }: Props,
    ref: React.MutableRefObject<TreeMethods>
  ) => {
    const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>(
      [] as NodeModel<CustomData>[]
    );
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      noClick: treeData.length != 0,
      onDrop: async (acceptedFiles, fileRejections, event) => {
        console.log("drop files 2");
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

    async function getFilesAndReset(data?: NodeModel<CustomData>[]) {
      if (!data) {
        data = await getFiles();
      }
      if (data != undefined) {
        if (JSON.stringify(treeData) == JSON.stringify(data)) {
          // console.log("data is the same, rerender omitted ")
        } else {
          // console.log("data is different, rerender...")
          setTreeData(data);
        }
      } else console.log("data is undefined");
    }

    useEffect(() => {
      getFilesAndReset();
    }, []);

    if (disabled) {
      return (
        <div className="file-tree-wrapper">
          <div className="file-tree-root file-tree-root-nothing">
            <p className="file-tree-root-nothing-text">Disabled</p>
          </div>
        </div>
      );
    }

    return (
      <div className="file-tree-wrapper">
        <div className="flex flex-row items-center ">
          {handleOpenAll ? (
            <button
              disabled={treeData.length == 0}
              className="bg-gray-500 text-white px-4 h-5 text-xs rounded-md hover:bg-gray-600 mr-5"
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
              className="bg-gray-500 text-white px-4 h-5 text-xs rounded-md hover:bg-gray-600 mr-5"
              onClick={() => {
                ref.current.closeAll();
                nodeOpenRef.current = [];
              }}
            >
              close all
            </button>
          ) : (
            <div className="h-5 w-0"></div>
          )}
          <Progress ref={progressRef} />
        </div>
        <div className="h-full" onDrop={fastDropCallback}>
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
                    onToggle={(id) => {
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
                      // console.log("now : ", nodeOpenRef.current)
                    }}
                    download={download}
                    onClick={
                      onClick &&
                      ((node) => {
                        return onClick(treeData, node);
                      })
                    }
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
                root: `file-tree-root ${
                  treeData.length == 0 ? "file-tree-root-nothing" : ""
                } `,
                draggingSource: "opacity-30 ",
                dropTarget: "bg-gray-200 dark:bg-gray-500",
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
              <p className="file-tree-root-nothing-text">{nothingText}</p>
            )}
          </div>
        </div>
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
