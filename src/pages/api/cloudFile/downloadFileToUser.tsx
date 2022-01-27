// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
// import archiver from 'archiver'
// import path from 'path';
// import extract from 'extract-zip';
import JSZip from 'jszip'
// import {  DownloadRequest,  DownloadReply } from '../../../proto/dockerGet/dockerGet_pb';
// import {grpcClient}from '../../../lib/grpcClient'
// import {v4 as uuidv4} from 'uuid';

type Data = {
  fileName:string
  file: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    // var client = grpcClient()
    const { userId } = req.query;
    var body = JSON.parse(req.body);
    var filePath:string=body.filePath
    var isFolder : boolean = body.isFolder 
    // var docReq = new DownloadRequest();
    // docReq.setFilepath(filePath)
    // docReq.setUserid(userId as string);
    //get only the file name of the file
    var fileName=filePath.split("/").slice(-1)[0]
    var rootPath= filePath
    // console.log(filePath,fileName)

    //make a download id 
    // var myuuid = uuidv4();
    // var newDownloadFolder= path.join(process.cwd(), `public`,myuuid)
    // fs.mkdirSync(newDownloadFolder)
    // fs.chmodSync(newDownloadFolder,0o777)
    // var filePath_next = path.join(newDownloadFolder,fileName);
    // console.log(filePathZip_next,filePath)

    try{
    
      // if (fileType=='folder'){
      //   filePath_next+='.zip'
      //   zipDirectory(filePath,filePath_next)
      // }else{
      //   fs.copyFileSync(filePath,filePath_next)    
      //   fs.chmodSync(filePath_next,0o777)  
      // }
      var base64:string
      if (isFolder){
        fileName+='.zip'
        const zip = new JSZip();
        addFilesFromDirectoryToZip(filePath,rootPath, zip);
        base64 = await zip.generateAsync({ type: "base64" });
      }else{
        base64 =fs.readFileSync(filePath,{ encoding: 'base64' })
      }

      // console.log(fileName,base64)
      res.json({
        fileName:fileName,
        file:base64
      });
      res.status(200).end()
    }
    catch(error) {
        res.json(error);
        res.status(405).end();
    }
  }


// function zipDirectory(sourceDir, outPath):Promise<void> {
//   const archive = archiver('zip', { zlib: { level: 9 }});
//   const stream = fs.createWriteStream(outPath);
  
//   return new Promise((resolve, reject) => {
//     archive
//       .directory(sourceDir, false)
//       .on('error', err => reject(err))
//       .pipe(stream)
//     ;

//     stream.on('close', () => resolve());
//     archive.finalize();
//   });
// }



const addFilesFromDirectoryToZip = (directoryPath:string= "",rootPath:string, zip:JSZip) => {
  console.log(directoryPath,rootPath)

  const directoryContents = fs.readdirSync(directoryPath, {
    withFileTypes: true,
  });
 
  directoryContents.forEach(({ name }) => {
    const path = `${directoryPath}/${name}`;

    if (fs.statSync(path).isFile()) {
      var finalPath= path.slice(path.indexOf(rootPath)+rootPath.length+1)
      console.log(finalPath)
      zip.file(finalPath, fs.readFileSync(path, "utf-8"));
    }

    if (fs.statSync(path).isDirectory()) {
      addFilesFromDirectoryToZip(path,rootPath, zip);
    }
  });
};


// var stream = client.downloadFile(docReq)
      // //write to the zip file 
     
      // stream.on('data', (GoLangResponse: DownloadReply,err:any) =>{
      //   if(GoLangResponse!=undefined){
      //     outputFile.write(GoLangResponse.getContent())
      //   }else{
      //     outputFile.write("fail to write chunk")
      //   }
      // })
      // stream.on('end',async ()=>{
      //   //return the zip file as is
      //   outputFile.close()
      // var outputFile = fs.createWriteStream(filePathZip_next)