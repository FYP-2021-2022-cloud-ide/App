import { Tree } from "@minoru/react-dnd-treeview";
import {
  CustomTreeProvider,
  Props,
  useCustomTree as useCustomTreeContext,
} from "./customTreeContext";
import useCustomTree from "./useCustomTree";

const Wrapped = () => {
  const {
    treeId,
    rootId,
    ref,
    data,
    showGlobalActionButtons,
    nothingText,
    openAll,
    closeAll,
    handleUpload,
    onDrop,
    canDrop,
  } = useCustomTreeContext();
  const {
    placeholderRender,
    sort,
    dropzoneRootProps,
    dragPreviewRender,
    classes,
    render,
    onClick,
    onContextMenu,
    getInputProps,
  } = useCustomTree();
  return (
    <div id={treeId}>
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
        <div id="dummy" className="h-5 w-0"></div>
      )}
      {/* the tree  */}
      <div
        {...dropzoneRootProps}
        id="tree"
        data-no-file={data.length == 0}
        onContextMenu={onContextMenu}
        onClick={onClick}
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
          dragPreviewRender={dragPreviewRender}
          sort={sort}
          placeholderRender={placeholderRender}
        ></Tree>
        {data.length == 0 && <p id="nothing-text">{nothingText}</p>}
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
