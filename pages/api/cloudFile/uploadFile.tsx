// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs';
import {Duplex}  from 'stream'; 
import path from 'path';
// import async from 'async'
type Data = {
  success: boolean
  message:string
  size: Number
}

export const config = {
  api: {
    bodyParser: false,
  },
};


import * as grpc from 'grpc';

import {  UploadRequest,  UploadReply } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';


export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());
    const { userId } = req.query;
    // const {filePath,file} = JSON.parse(req.body);
    // var formData :FormData=req.body
    // //console.log(formData)


    var call = client.uploadFile(function(error, GoLangResponse:UploadReply){
        if (error){
            console.log(error)
            res.json({success:false,message:error.message, size:0,})
        }
        res.json({
            success:GoLangResponse.getSuccess(),
            message:GoLangResponse.getMessage(),
            size:GoLangResponse.getSize(),
        })
    })


    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    //@ts-ignore
    const file = data?.files?.file.filepath;
    //@ts-ignore
    const fileName = data?.files?.file.originalFilename
    //@ts-ignore
    const filePath = data?.fields?.filePath;
    // const filePath_next = path.join(process.cwd(), `/public/uploadTest/data.txt`);
    // var readStream: fs.ReadStream = fs.createReadStream(data?.files?.nameOfTheInput.path);
    var readStream:Duplex= bufferToStream(fs.readFileSync(file))

    var docReq=new UploadRequest()
    var metaData=new UploadRequest.UploadMetadata()
    metaData.setFilepath(
      filePath+fileName)
    metaData.setUserid(userId as string)
    docReq.setMetadata(metaData)
    call.write(docReq);

    readStream.on('readable', () => {
      let chunk:string;
      console.log('Stream is readable (new data received in buffer)');
      // Use a loop to make sure we read all currently available data
      while (null !== (chunk = readStream.read())) {
        console.log(`Read ${chunk.length} bytes of data...`);
        var docReq=new UploadRequest()
        docReq.setContent(chunk)
        call.write(docReq);
      }
    });
    readStream.on('end', () => {
      console.log('Reached end of stream.');
      call.end();
    });    

  }


function bufferToStream(myBuffer:Buffer) {
  let tmp = new Duplex();
  tmp.push(myBuffer);
  tmp.push(null);
  return tmp;
}