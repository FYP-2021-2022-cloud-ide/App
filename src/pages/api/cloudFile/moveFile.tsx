// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {grpcClient}from '../../../lib/grpcClient'

import {  SuccessStringReply,  MoveFileRequest } from '../../../proto/dockerGet/dockerGet_pb';

type Data = {
  success: boolean
  message:string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    const { userId } = req.query;
    const{source,target}= JSON.parse(req.body);
    var docReq = new MoveFileRequest();
    docReq.setUserid(userId as string);
    docReq.setSource(source );
    docReq.setTarget(target );
    try{
      client.moveFile(docReq, function(err, GoLangResponse: SuccessStringReply) {
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