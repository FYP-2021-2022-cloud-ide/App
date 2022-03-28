// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

import JSZip from 'jszip'

import { LocalFilesDownloadToUserResponse ,nodeError,emptyError} from "../../../lib/api/api";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocalFilesDownloadToUserResponse>
  ) {
    // var client = grpcClient()
    const { userId } = req.query;
    var body = JSON.parse(req.body);
    var filePath:string=body.filePath
    var isFolder : boolean = body.isFolder 

    //get only the file name of the file
    var fileName=filePath.split("/").slice(-1)[0]
    var rootPath= filePath


    try{
    
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
        success:true,
        error:emptyError,
        fileName:fileName,
        file:base64
      });
      res.status(200).end()
    }
    catch(error) {
        res.json({
          success:false,
          error:nodeError(error) ,
        });
        res.status(405).end();
    }
  }



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

export const config = {
  api: {
    externalResolver: true
  }
}