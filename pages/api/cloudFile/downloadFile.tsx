// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
<<<<<<< HEAD
import fs from 'fs';
import path from 'path';

=======
>>>>>>> 00b64033b02359dfc4451d774a71a3763aacbf9b

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

<<<<<<< HEAD
import {  DownloadRequest,  DownloadReply } from '../../../proto/dockerGet/dockerGet_pb';
=======
import {  DownloadReuqest,  DownloadReply } from '../../../proto/dockerGet/dockerGet_pb';
>>>>>>> 00b64033b02359dfc4451d774a71a3763aacbf9b
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
    var docReq = new DownloadRequest();
    docReq.setFilepath(filePath as string)
    docReq.setUserid(userId as string);
    
    try{
      var stream = client.downloadFile(docReq)
      
      stream.on('data', function(err:any, GoLangResponse: DownloadReply) {
        // if(!GoLangResponse.getSuccess()){
        console.log(GoLangResponse)
        // }
        const filePath_next = path.join(process.cwd(), `/public/uploadTest/download.txt`);
        fs.writeFile(filePath_next, GoLangResponse.getContent_asU8(), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        })
      })
      stream.on('end',()=>{
        res.status(200).end()
      })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }