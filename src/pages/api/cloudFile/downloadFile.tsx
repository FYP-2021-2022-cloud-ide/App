// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';


type Data = {
  filePath: string
}



import * as grpc from 'grpc';

import {  DownloadRequest,  DownloadReply } from '../../../proto/dockerGet/dockerGet_pb';
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
    var body = JSON.parse(req.body);
    var filePath:string=body.filePath
          
    var docReq = new DownloadRequest();
    docReq.setFilepath(filePath)
    docReq.setUserid(userId as string);
    //get only the file name of the file
    var fileName=filePath.split("/").slice(-1)[0]
    // console.log(fileName)
    var tmpPath=`/public/uploadTest/`+fileName
    
    try{
      var stream = client.downloadFile(docReq)
      const filePath_next = path.join(process.cwd(), tmpPath);
      var outputFile = fs.createWriteStream(filePath_next)
      stream.on('data', (GoLangResponse: DownloadReply,err:any) =>{
        if(GoLangResponse!=undefined){
          outputFile.write(GoLangResponse.getContent())
        }else{
          outputFile.write("fail to write chunk")
        }
      })
      
      stream.on('end',()=>{
        outputFile.close()
        // const imageBuffer = fs.readFileSync(filePath_next);\
        res.json({filePath:filePath_next});
        res.status(200).end()
      })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }