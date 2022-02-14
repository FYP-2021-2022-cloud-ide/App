// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import {grpcClient}from '../../../lib/grpcClient'

import { LocalFilesListResponse } from "../../../lib/api/api";
import fs from 'fs/promises'
import dirTree, { DirectoryTree } from 'directory-tree';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LocalFilesListResponse>
) {
    // var client = grpcClient()
    const { userId } = req.query;
    const { source, target } = JSON.parse(req.body);

    try {
        await fs.rename(source, target)


        let tree: DirectoryTree
        try {
            tree = dirTree("/volumes/" + userId + "/persist")
            res.json({
                success: true,
                message: "",
                tree: tree,
            });
            res.status(200).end();
        } catch (error) {
            res.json({
                success:false,
                message:error
              });
            res.status(405).end();
        }
    }
    catch (error) {
        let tree: DirectoryTree
        try {
            tree = dirTree("/volumes/" + userId + "/persist")
            res.json({
                success: false,
                message: error,
                tree: tree
            });
            res.status(405).end();
        } catch (error) {
            res.json({
                success:false,
                message:error
              });
            res.status(405).end();
        }
    }
}