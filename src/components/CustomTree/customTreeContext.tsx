import {
  DropOptions,
  NodeModel,
  TreeMethods,
} from "@minoru/react-dnd-treeview";
import _ from "lodash";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DropEvent, FileRejection } from "react-dropzone";
import useComponentVisible from "../../hooks/useComponentVisible";
import ContextMenu, { MenuItem } from "./ContextMenu";
import { CustomData } from "./CustomNode";

export type HandleMoveArgs =
  | {
      sameTree: true;
      /**
       * @param treeData the treeData that suppose to be after this move.
       */
      treeData: NodeModel<CustomData>[];
      /**
       * @param options Note that `dropTarget` is `undefined` if the the target is root. Else it is the id of the target node.
       */
      options: DropOptions<CustomData>;
    }
  | {
      sameTree: false;
      /**
       * @param dropTarget target is `undefined` if moving to root, else target is the id of the target node.
       * Therefore in your dnd, you need to handle 3 cases:
       *
       * 1. `dropTarget` is `undefined`
       * 2. `dropTarget` is the a directory
       * 3. `dropTarget` is a file
       */
      dropTarget: NodeModel<CustomData>;
    };

type GetNodeActionsArgs = {
  /**
   * open the file upload input
   */
  open: () => void;
};

type GetRootActionsArgs = {
  /**
   * open the file upload input
   */
  open: () => void;
};

export type Props = {
  /**
   * the id of the tree
   */
  treeId: string;
  /**
   * the root id of the tree, by default is 0.
   * The root id is the parent of files in the first layer. Therefore, it make sense to set this as the root directory path.
   *
   * @remark you root id need to match the first nth directory path of your nodes. Otherwise the tree will not display the node.
   */
  rootId?: string | number;
  /**
   * the tree data
   */
  data: NodeModel<CustomData>[];
  /**
   * this will be changed when the last active node of this tree changes.
   * This function is useful if you need to implement cross tree dnd.
   *
   * @param node the new last active node in this tree
   * @param treeId  the id of the tree
   */
  onLastActiveNodeChange: (
    node: NodeModel<CustomData>,
    treeId: string
  ) => void | Promise<void>;

  /**
   * this function is for dnd upload files. The div wrappering the tree view is a dropzone. Each button of file is also a dropzone.
   * `node` is passed as parameter if the upload target is a node. Otherwise, `node`  will be undefined.
   */
  handleUpload?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
    node?: NodeModel<CustomData>
  ) => void | Promise<void>;

  handleMove: (args: HandleMoveArgs) => void | Promise<void>;
  /**
   * this is called when the directory is toggled
   */
  onToggle?: (
    node: NodeModel<CustomData>,
    open: boolean
  ) => void | Promise<void>;
  /**
   * this is called when a node is click
   */
  onClick?: (node: NodeModel<CustomData>) => void | Promise<void>;
  /**
   * called when a node is started to be dragged
   */
  onDragStart?: (node: NodeModel<CustomData>) => void | Promise<void>;
  /**
   * called when a node dragging is ended
   */
  onDragEnd?: (node: NodeModel<CustomData>) => void | Promise<void>;
  /**
   * This is just a forward props of the original Tree component.
   * This callback is used to check whether the a node can drag and drop within tree or cross-tree.
   */
  canDrop: (
    tree: NodeModel<CustomData>[],
    options: DropOptions<CustomData>
  ) => boolean | void;
  /**
   * a dummy text showing on UI when there is no file in the tree
   */
  nothingText?: string;
  /**
   * given a node, return a list of actions such that can be shown on the context menu.
   * If this is `undefined`, the tree will not have context menu on nodes.
   */
  getNodeActions?: (
    node: NodeModel<CustomData>,
    args: GetNodeActionsArgs
  ) => MenuItem[];
  /**
   * a list of actions shown on context menu when right click on root.
   * If this is `undefined`, the tree will not have context menu on tree div
   */
  getRootActions?: (args: GetRootActionsArgs) => MenuItem[];
  /**
   * buttons like `open all` and `close all` are shown above the tree view.
   * By default, this is `true`. Hide the buttons by setting `false`.
   * Hidding the button is useful when the fetching of treeData is done folder-by-folder (for example, the data are from remote storage).
   * The tree data will never reveal the complete directory tree and therefore operations such as `open all` does not make sense.
   */
  showGlobalActionButtons?: boolean;
};

type CustomTreeContextState = {
  ref: React.MutableRefObject<TreeMethods>;
  openIdsRef: React.MutableRefObject<string[]>;
  getNode: (id: string) => NodeModel<CustomData>;
  isMenuVisible: boolean;
  menuLocation: number[];
  setMenuLocation: React.Dispatch<React.SetStateAction<number[]>>;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  changeLastActiveNode: (id: string) => void;
  openContextMenu: (location: number[], menuItems: MenuItem[]) => void;
  openAll: () => void;
  closeAll: () => void;
  onDrop: (
    tree: NodeModel<CustomData>[],
    options: DropOptions<CustomData>
  ) => void;
} & Omit<Props, "onLastActiveNodeChange">;

const CustomTreeContext = createContext({} as CustomTreeContextState);

export const useCustomTree = () => useContext(CustomTreeContext);

export const CustomTreeProvider = ({
  children,
  ...props
}: { children: JSX.Element } & Props) => {
  const {
    treeId,
    rootId = 0,
    data,
    onLastActiveNodeChange,
    onClick,
    onDragEnd,
    onDragStart,
    onToggle,
    handleMove,
    handleUpload,
    showGlobalActionButtons = true,
    getNodeActions,
    getRootActions,
    canDrop,
  } = props;
  const ref = useRef<TreeMethods>();
  const openIdsRef = useRef<string[]>([]);
  const {
    ref: menuRef,
    isComponentVisible: isMenuVisible,
    setIsComponentVisible: setIsMenuVisible,
  } = useComponentVisible(false);
  const [menuLocation, setMenuLocation] = useState([0, 0]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const lastActiveNodeRef = useRef<string>();

  const getNode = useCallback(
    (id: string) => data.find((node) => node.id == id),
    [data]
  );

  const changeLastActiveNode = useCallback(
    (id: string) => {
      lastActiveNodeRef.current = id;
      if (onLastActiveNodeChange) onLastActiveNodeChange(getNode(id), treeId);
    },
    [lastActiveNodeRef, treeId, onLastActiveNodeChange, getNode]
  );

  const openContextMenu = (location: number[], menuItems: MenuItem[]) => {
    if (menuItems.length > 0) {
      setMenuLocation(location);
      setMenuItems(menuItems);
    }
  };

  const closeAll = useCallback(() => {
    openIdsRef.current = [];
    ref.current.closeAll();
  }, [openIdsRef, ref]);

  const openAll = useCallback(() => {
    openIdsRef.current = data
      .filter((node) => node.droppable)
      .map((node) => String(node.id));
    ref.current.openAll();
  }, [openIdsRef, data, ref]);

  const onDrop = useCallback(
    async (
      newTreeData: NodeModel<CustomData>[],
      dropOptions: DropOptions<CustomData>
    ) => {
      const { dragSourceId, dropTargetId, dragSource, dropTarget } =
        dropOptions;
      if (dragSource == undefined) {
        // from another tree
        await handleMove({
          sameTree: false,
          dropTarget: dropTarget,
        });
        return;
      }
      if (dragSource.id == dropTarget?.id) {
        // if the target parent is the same as old parent , there is no moving of files, so just refresh the UI
        return;
      }
      await handleMove({
        sameTree: true,
        options: dropOptions,
        treeData: newTreeData,
      });
    },
    [handleMove]
  );

  useEffect(() => {
    console.log(openIdsRef.current);
  }, []);

  if (!data) return <></>;

  return (
    <CustomTreeContext.Provider
      value={{
        ref,
        treeId,
        rootId,
        data,
        handleMove,
        handleUpload,
        getNodeActions,
        getRootActions,
        showGlobalActionButtons,
        onClick,
        onDragEnd,
        onDragStart,
        onToggle,
        openIdsRef,
        getNode,
        isMenuVisible,
        menuLocation,
        setMenuLocation,
        menuItems,
        setMenuItems,
        changeLastActiveNode,
        openContextMenu,
        openAll,
        closeAll,
        onDrop,
        canDrop,
      }}
    >
      {children}
      <ContextMenu
        ref={menuRef}
        isMenuVisible={isMenuVisible}
        setIsMenuVisible={setIsMenuVisible}
        menuItems={menuItems}
        menuLocation={menuLocation}
      />
    </CustomTreeContext.Provider>
  );
};
