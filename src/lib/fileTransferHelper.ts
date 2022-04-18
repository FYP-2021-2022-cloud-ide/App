/**
 * there are 3 types of data tree for the file transfer
 * 1. directory-tree which is used by our backend
 * 2. GoogleFolder which is the data tree returned from Google drive API
 * 3. UI tree / NodeModel which the data tree used in UI
 *
 * Therefore, every data tree needs to convert to UI tree in order to use the tree component.
 */

import { NodeModel } from "@minoru/react-dnd-treeview";
import { DirectoryTree } from "directory-tree";
import path from "path";
import { CustomData } from "../components/CustomTree/CustomNode";
import { googleAPI } from "./api/googleAPI";

/**
 * store all the status text
 */
export const status = {
  preparing: "preparing files...", // prepare files in the browser
  loading: "loading...",
  uploading: "Uploading files......",
  transfering: "transfering files in the backend...",
};

/**
 * This function is a blacklist function based on the path of files uploaded.
 *
 * @param path the file path
 * @returns whether the file should be blacklisted
 */
export const isBlacklisted = (path: string): boolean => {
  // TODO
  // should check blacklisted Files , folders and custom blacklisted
  return path.includes("node_modules");
};

/**
 * expand a google folder in a tree and return the new tree. The original tree is not modified.
 * @param wholeTree the original tree
 * @param folder the target folder to expand
 * @param sub
 * @returns the new tree
 */
export const expandGoogleFolder = async (
  wholeTree: GoogleFolder,
  folder: GoogleFolder,
  sub: string
): Promise<GoogleFolder> => {
  const { id, name, path, closed } = folder;
  const response = await googleAPI.expandFolder(id, sub);
  if (response.success) {
    const { folders, files } = response.loadedFiles;
    let temp: GoogleFolder = {
      id: id,
      name: name,
      path: path,
      closed: closed,
      children: folders.map((child) => {
        // see if the folder has been expanded before
        // if yes, replace it
        // if no, return []

        const folder = getFolderById(wholeTree, child.id);
        return {
          id: child.id,
          name: child.name,
          path: path + "/" + child.name,
          closed: true,
          children: folder ? folder.children : [],
          files: folder ? folder.files : [],
        };
      }),
      files: files.map((file) => ({
        id: file.id,
        name: file.name,
        path: path + "/" + file.name,
      })),
    };
    return findAndReplaceGoogleFolder(wholeTree, temp);
  } else {
    // console.error(response.error);
  }
};

/**
 * The design of Google folder is that the children will be emptied unless the children inside a folder is requested.
 * Therefore, you can use whether the children length is 0 as an indicator of whether the folder has been fetched or not.
 * However, using this method will always refetch the children of a folder if the folder is indeed empty.
 */
export type GoogleFolder = {
  id: string;
  name: string;
  path: string;
  closed: boolean;
  children?: GoogleFolder[];
  files?: GoogleFile[];
};

export type GoogleFile = {
  id: string;
  name: string;
  path: string;
};

/**
 * Find the corresponding item in the old tree and replace it
 * This function is used when a google folder is expanded.
 * The API will return the new item and we need to replace the empty google folder with the new item
 * @param oldTree
 * @param newItem
 * @returns
 */
export const findAndReplaceGoogleFolder = (
  oldTree: GoogleFolder,
  newItem: GoogleFolder
): GoogleFolder => {
  if (!oldTree) return newItem;
  if (oldTree.id == newItem.id) return newItem;
  // let temp: GoogleFolder = {
  //   id: oldTree.id,
  //   name: oldTree.name,
  //   path: oldTree.path,
  //   closed: oldTree.closed,
  //   children: oldTree.children.map((child) =>
  //     findAndReplaceGoogleFolder(child, newItem)
  //   ),
  //   files: oldTree.files,
  // };
  return Object.assign(oldTree, {
    children: oldTree.children.map((child) =>
      findAndReplaceGoogleFolder(child, newItem)
    ),
  });
};

/**
 * given a google folder tree and an id, find this id in the tree recursively
 * @param tree
 * @param id
 * @returns
 */
export const getFolderById = (tree: GoogleFolder, id: string): GoogleFolder => {
  if (!tree) return undefined;
  if (tree.id == id) return tree;
  for (let child of tree.children) {
    let result = getFolderById(child, id);
    if (result) return result;
  }
  return undefined;
};

/**
 * given a google folder, convert it to NodeModel.
 * @param tree
 * @param parent  When calling this function manually, `parent` is not required because it is for recursion only.
 * @returns
 */
export const convertGoogleTree = (
  tree: GoogleFolder,
  parent: string | number = "root"
): NodeModel<CustomData>[] => {
  if (!tree) return undefined;
  let children = tree.children;
  let uitree: NodeModel<CustomData>[] = [];
  if (children != undefined) {
    for (let child of children) {
      uitree.push({
        id: child.id,
        parent: parent,
        text: child.name,
        droppable: true,
        data: {
          filePath: child.path,
          fileType: "directory",
        },
      });
      uitree = uitree.concat(convertGoogleTree(child, child.id));
    }
  }
  for (let file of tree.files) {
    uitree.push({
      id: file.id,
      parent: parent,
      text: file.name,
      droppable: false,
      data: {
        filePath: file.path,
        fileType: "file",
      },
    });
  }
  return uitree;
};

/**
 * given a directory tree, convert it to NodeModel
 * @param tree
 * @param parent
 * @returns
 */
export function convertDirectoryTree(
  tree: DirectoryTree,
  parent?: string | number
): NodeModel<CustomData>[] {
  if (!tree) return undefined;
  let temp: NodeModel<CustomData>[] = [];
  if (parent)
    temp.push({
      id: tree.path,
      parent: parent,
      text: tree.name,
      droppable: tree.children != undefined,
      data: {
        filePath: tree.path,
        fileSize: String(tree.size),
        fileType: tree.type,
      },
    });
  if (tree.children != undefined) {
    for (let t of tree.children) {
      const a = convertDirectoryTree(t, path.dirname(t.path));
      temp = temp.concat(a);
    }
  }
  return temp;
}

export default {
  convertDirectoryTree,
  convertGoogleTree,
  getFolderById,
  findAndReplaceGoogleFolder,
  expandGoogleFolder,
  isBlacklisted,
};
