// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
}



import * as grpc from 'grpc';

import {  RemoveFileRequest,  SuccessStringReply } from '../../../proto/dockerGet/dockerGet_pb';
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
    const{filePath}= JSON.parse(req.body);
    var docReq = new RemoveFileRequest();
    docReq.setUserid(userId as string);
    docReq.setFilepath(filePath)
    try{
      client.removeFile(docReq, function(err, GoLangResponse: SuccessStringReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        res.json({ 
          success : GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
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