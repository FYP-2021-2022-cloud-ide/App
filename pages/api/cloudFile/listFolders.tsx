// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  root: Folder_this | null
}

type Folder_this= {
  name: string
  children: Folder_this[]|null
  files:Files[]|null
}

type Files = {
  name: string
  path: string
}

import * as grpc from 'grpc';

import {  ListFolderReply,  UserIdRequest,Folder } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';


function recursiveFolder(f:Folder) : Folder_this{
    return ({
            name:f?.getName().slice(f?.getName().indexOf("_data")+5,-1),
            files:f?.getFilesList().map( file =>{
              return ({
                name: file.getName(),
                path: file.getPath(),
              })
            }),
            children:f?.getChildrenList().map(child=>recursiveFolder(child))

        
    })
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());
    const { userId } = req.query;
    
    var docReq = new UserIdRequest();
    docReq.setUserid(userId as string);
    
    try{
      client.listFolders(docReq, function(err, GoLangResponse: ListFolderReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        var root =GoLangResponse.getRoot();
        res.json({ 
          success : GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          root:recursiveFolder(root!)
        });

        res.status(200).end();
      })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }