
import type { NextApiRequest, NextApiResponse } from 'next'
import dirTree from 'directory-tree'


import { LocalFilesListResponse ,nodeError,emptyError} from "../../../lib/api/api";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<LocalFilesListResponse>
) {
    // var client = grpcClient()
    console.log("get files from server ")
    const { userId } = req.query;

    try {
        const tree = dirTree("/volumes/" + userId + "/persist")
        res.json({
            success: true,
            error:emptyError,
            tree: tree
        });

        res.status(200).end();
    }
    catch (error) {
        res.json({
            success:false,
            error:nodeError(error) ,
          });
        res.status(405).end();
    }
}