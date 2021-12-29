// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  filechuck: FileChunk | null
}

type FileChunk= {
  content: Uint8Array | string;
  totalSize: string
  transferred:string
}


import * as grpc from 'grpc';

import {  DownloadReuqest,  DownloadReply } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());
    const { userId } = req.query;
    const {filePath} = JSON.parse(req.body);
    var docReq = new DownloadReuqest();
    docReq.setFilepath(filePath as string)
    docReq.setUserid(userId as string);
    
    try{
      var stream = client.downloadFile(docReq)
      
      stream.on('data', function(err:any, GoLangResponse: DownloadReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        res.json({ 
          success : GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          filechuck:{
            content : GoLangResponse.getFilechunk()!.getContent(),
            totalSize : GoLangResponse.getFilechunk()!.getTotalsize(),
            transferred : GoLangResponse.getFilechunk()!.getTransferred(),
          }
        });
        res.status(200).end();
      })
      stream.on('end',()=>{})
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }