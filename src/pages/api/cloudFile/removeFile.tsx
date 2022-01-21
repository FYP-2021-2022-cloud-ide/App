// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import {grpcClient}from '../../../lib/grpcClient'
// import {  PathRequest,  SuccessStringReply } from '../../../proto/dockerGet/dockerGet_pb';
import fs from 'fs'

type Data = {
  success: boolean
  message:string
}




export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    // var client = grpcClient()
    const { userId } = req.query;
    const{path}= JSON.parse(req.body);
    // var docReq = new PathRequest();
    // docReq.setUserid(userId as string);
    // docReq.setPath(path)
    // console.log(docReq)
    try{
      // client.removeFile(docReq, function(err, GoLangResponse: SuccessStringReply) {
      //   if(!GoLangResponse.getSuccess()){
      //     console.log(GoLangResponse.getMessage())
      //   }
      //   res.json({ 
      //     success : GoLangResponse.getSuccess(),
      //     message: GoLangResponse.getMessage(),
      //   });
      fs.rmSync(path,{
        recursive:true
      })
      res.json({ 
        success :true,
        message: "",
      });
      res.status(200).end();
      // })
    }
    catch(error) {
      console.log(error)
        //@ts-ignore
        res.json({ 
          success :false,
          message: error,
        });
        res.status(405).end();
    }
  }