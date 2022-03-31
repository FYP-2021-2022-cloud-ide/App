// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import {grpcClient}from '../../../lib/grpcClient'
// import {exec} from 'child_process'
import { nobody } from "../../../lib/cloudFile";
import fs from "fs/promises";
import dirTree, { DirectoryTree } from "directory-tree";

import {
  LocalFilesListResponse,
  nodeError,
  emptyError,
} from "../../../lib/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocalFilesListResponse>
) {
  const { userId } = req.query;
  const { path } = JSON.parse(req.body);

  try {
    await fs.mkdir(path, { recursive: true });
    await fs.chmod(path, 0o777);
    await fs.lchown(path, nobody(), nobody());
    let tree: DirectoryTree;
    try {
      tree = dirTree("/volumes/" + userId + "/persist");
      res.json({
        success: true,
        error: emptyError,
        tree: tree,
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
  } catch (error) {
    console.error(error.stack);
    let tree: DirectoryTree;
    try {
      tree = dirTree("/volumes/" + userId + "/persist");
      res.json({
        success: false,
        error: nodeError(error),
        tree: tree,
      });
      res.status(405).end();
    } catch (error) {
      console.error(error.stack);
      res.json({
        success: false,
        error: nodeError(error),
      });
      res.status(405).end();
    }
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
