// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
import extract from 'extract-zip';
import {  DownloadRequest,  DownloadReply } from '../../../proto/dockerGet/dockerGet_pb';
import {grpcClient}from '../../../lib/grpcClient'

type Data = {
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    const { userId } = req.query;
    var body = JSON.parse(req.body);
    var filePath:string=body.filePath
          
    var docReq = new DownloadRequest();
    docReq.setFilepath(filePath)
    docReq.setUserid(userId as string);
    //get only the file name of the file
    var fileName=filePath.split("/").slice(-1)[0]
    // console.log(fileName)
    const filePath_next = path.join(process.cwd(), `/public/uploadTest/`);
    const filePathZip_next = path.join(process.cwd(), `/public/uploadTest/`+fileName+".zip");

    try{
      var stream = client.downloadFile(docReq)
      //write to the zip file 
      var outputFile = fs.createWriteStream(filePathZip_next)
      stream.on('data', (GoLangResponse: DownloadReply,err:any) =>{
        if(GoLangResponse!=undefined){
          outputFile.write(GoLangResponse.getContent())
        }else{
          outputFile.write("fail to write chunk")
        }
      })
      stream.on('end',async ()=>{
        outputFile.close()
        //extract the zip file 
        await extract(filePathZip_next, { dir: filePath_next,defaultDirMode:0o777, defaultFileMode :0o777 })
        console.log('Extraction complete')
        //delete the zip file after extracting 
        fs.unlink(filePathZip_next, (err) => {
          if (err) throw err;
        });

        res.status(200).end()
      })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }