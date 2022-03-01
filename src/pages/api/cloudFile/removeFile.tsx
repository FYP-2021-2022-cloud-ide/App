// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import {grpcClient}from '../../../lib/grpcClient'
// import {  PathRequest,  SuccessStringReply } from '../../../proto/dockerGet/dockerGet_pb';
import fs from 'fs/promises'
import dirTree, { DirectoryTree } from 'directory-tree';

import { LocalFilesListResponse  ,nodeError,emptyError} from "../../../lib/api/api";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LocalFilesListResponse>
) {
    // var client = grpcClient()
    const { userId } = req.query;
    const { path } = JSON.parse(req.body);
    try {

        await fs.rm(path, {
            recursive: true
        })


        let tree: DirectoryTree

        try {
            tree = dirTree("/volumes/" + userId + "/persist")
            res.json({
                success: true,
                error:emptyError,
                tree: tree
            });
            res.status(200).end();
        } catch (error) {
            res.json({
                success:false,
                error:nodeError(error) ,
              });
            res.status(405).end();
        }
        // })
    }
    catch (error) {
        let tree: DirectoryTree
        try {
            tree = dirTree("/volumes/" + userId + "/persist")
            res.json({
                success: false,
                error:nodeError(error) ,
                tree: tree
            });
            res.status(405).end();
        } catch (error) {
            res.json({
                success:false,
                error:nodeError(error) ,
              });
            res.status(405).end();
        }
    }
}