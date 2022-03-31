import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs/promises";
import { nobody } from "../../../lib/cloudFile";
import path from "path";
import dirTree, { DirectoryTree } from "directory-tree";

import {
  LocalFilesListResponse,
  nodeError,
  emptyError,
} from "../../../lib/api/api";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocalFilesListResponse>
) {
  const { userId } = req.query;
  const data: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, { files }) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  let tree1: DirectoryTree;

  try {
    tree1 = dirTree("/volumes/" + userId + "/persist");
  } catch (error) {
    console.error(error.stack);
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  }

  const {
    fields: { filePath },
    files,
  } = data;
  if (Array.isArray(files)) {
    files.forEach(async (file, index) => {
      var targetPath = `/${filePath
        .split("/")
        .filter((t) => t != "")
        .join("/")}/${file.originalFilename
        .split("/")
        .filter((t) => t != "")
        .join("/")}`;
      await ensureDirectoryExistence(targetPath);
      await fs.copyFile(file.filepath, targetPath);
      await fs.chmod(targetPath, 0o777);
      await fs.lchown(targetPath, nobody(), nobody());
    });
  } else {
    var file = files;
    console.log(file.filepath);
    var targetPath = `${filePath}/${file.originalFilename}`;
    await ensureDirectoryExistence(targetPath);
    await fs.copyFile(file.filepath, targetPath);
    await fs.chmod(targetPath, 0o777);
    await fs.chown(targetPath, nobody(), nobody());
  }
  let tree2: DirectoryTree;
  console.log("check tree2 ");

  try {
    tree2 = dirTree("/volumes/" + userId + "/persist");
    // if (JSON.stringify(tree1) == JSON.stringify(tree2))
    //     throw new Error("internal server error. Past tree and current tree is the same")
    console.log("return data");
    res.json({
      success: true,
      error: emptyError,
      tree: tree2,
    });

    res.status(200).end();
  } catch (error) {
    console.error(error.stack);
    res.json({
      success: false,
      error: nodeError(error),
    });
    res.status(405).end();
  }
}
async function ensureDirectoryExistence(filePath) {
  try {
    await fs.readdir(path.dirname(filePath));
  } catch (error) {
    console.log(`DIRECTORY_NOT_EXIST: creating ${path.dirname(filePath)}...`);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
  }
}

// export const config = {
//     api: {
//       externalResolver: true
//     }
//   }
