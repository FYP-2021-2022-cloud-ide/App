// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import {grpcClient}from '../../../lib/grpcClient'
// import fs from 'fs';
// import path from 'path';
import dirTree from 'directory-tree'

// import {  ListFolderReply,  UserIdRequest,Folder } from '../../../proto/dockerGet/dockerGet_pb';

type Data = {
    success: boolean
    message: string
    tree: directoryTree.DirectoryTree | null
}

// type Folder= {
//   name: string
//   path: string
//   children: Folder[]|null
//   files:Files[]|null
// }

// type Files = {
//   name: string
//   path: string
// }


// function recursiveFolder(f:Folder) : Folder_this{
//     return ({
//       name:f?.getName(),
//       files:f?.getFilesList().map( file =>{
//         return ({
//           name: file.getName(),
//           path: file.getPath(),
//         })
//       }),
//       children:f?.getChildrenList().map(child=>recursiveFolder(child))


//     })
// }

// function recursiveFolder(f:string) :{
//   // fs.readdirSync(f)
//   return (
//     dirTree(f)
//     )
// }

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // var client = grpcClient()
    console.log("get files from server ")
    const { userId } = req.query;

    // var docReq = new UserIdRequest();
    // docReq.setUserid(userId as string);

    try {
        // client.listFolders(docReq, function(err, GoLangResponse: ListFolderReply) {
        //   if(!GoLangResponse.getSuccess()){
        //     console.log(GoLangResponse.getMessage())
        //   }
        //   // console.log(GoLangResponse)
        //   var root =GoLangResponse.getRoot();
        //   res.json({ 
        //     success : GoLangResponse.getSuccess(),
        //     message: GoLangResponse.getMessage(),
        //     root:recursiveFolder(root!)
        //   });
        const tree = dirTree("/volumes/" + userId + "/persist")
        // console.log(tree)
        res.json({
            success: true,
            message: "",
            tree: tree
        });

        res.status(200).end();
    }
    catch (error) {
        res.json(error);
        res.status(405).end();
    }
}