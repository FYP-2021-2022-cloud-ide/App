// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs';
// import {grpcClient}from '../../../lib/grpcClient'
import { nobody } from '../../../lib/cloudFile';
// import {Duplex}  from 'stream'; 
import path from 'path';
// import {  UploadRequest,  UploadReply } from '../../../proto/dockerGet/dockerGet_pb';
// import { files } from 'jszip';
// import async from 'async'


type Data = {
  success: boolean
  message:string
}

export const config = {
  api: {
    bodyParser: false,
  },
};


export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // var client = grpcClient()
  const { userId } = req.query;
  // const {file} = JSON.parse(req.body);
  // var formData :FormData=req.body
  // //console.log(formData)

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  // console.log(data)
  // //@ts-ignore
  // const file = data?.files?.folderzip.filepath;
  // //@ts-ignore
  // const fileName = data?.files?.folderzip.originalFilename+".zip"
  //@ts-ignore
  const filePath = data?.fields?.filePath;
  // const filePath_next = path.join(process.cwd(), `/public/uploadTest/data.txt`);
  // var readStream: fs.ReadStream = fs.createReadStream(data?.files?.nameOfTheInput.path);

  //@ts-ignore
  for (let file in data?.files){
      //@ts-ignore
    var thisFile =data?.files[file]
    var targetPath= filePath+'/'+thisFile.originalFilename
    ensureDirectoryExistence(targetPath)
    fs.copyFileSync(thisFile.filepath,targetPath)
    fs.chmodSync(targetPath,0o777) 
    fs.lchownSync(targetPath,nobody(),nobody()) 
  }
  res.json({ 
    success :true,
    message: ""
  });

  res.status(200).end();
}
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
  fs.chmodSync(dirname,0o777) 
  fs.lchownSync(dirname,nobody(),nobody()) 

}

// function bufferToStream(myBuffer:Buffer) {
//   let tmp = new Duplex();
//   tmp.push(myBuffer);
//   tmp.push(null);
//   return tmp;
// }

// export default  async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   var client = grpcClient()
//   const { userId } = req.query;
//   // const {filePath,file} = JSON.parse(req.body);
//   // var formData :FormData=req.body
//   // //console.log(formData)


//   var call = client.uploadFile(function(error, GoLangResponse:UploadReply){
//       if (error){
//           console.log(error)
//           res.json({success:false,message:error.message, size:0,})
//       }
//       res.json({
//           success:GoLangResponse.getSuccess(),
//           message:GoLangResponse.getMessage(),
//           size:GoLangResponse.getSize(),
//       })
//   })


//   const data = await new Promise((resolve, reject) => {
//     const form = new IncomingForm();
//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });
//   console.log(data)
//   //@ts-ignore
//   const file = data?.files?.folderzip.filepath;
//   //@ts-ignore
//   const fileName = data?.files?.folderzip.originalFilename+".zip"
//   //@ts-ignore
//   const filePath = data?.fields?.filePath;
//   // const filePath_next = path.join(process.cwd(), `/public/uploadTest/data.txt`);
//   // var readStream: fs.ReadStream = fs.createReadStream(data?.files?.nameOfTheInput.path);
//   var readStream:Duplex= bufferToStream(fs.readFileSync(file))

//   var docReq=new UploadRequest()
//   var metaData=new UploadRequest.UploadMetadata()
//   metaData.setFilepath(
//     filePath+fileName)
//   metaData.setUserid(userId as string)
//   docReq.setMetadata(metaData)
//   call.write(docReq);

//   readStream.on('readable', () => {
//     let chunk:string;
//     console.log('Stream is readable (new data received in buffer)');
//     // Use a loop to make sure we read all currently available data
//     while (null !== (chunk = readStream.read())) {
//       console.log(`Read ${chunk.length} bytes of data...`);
//       var docReq=new UploadRequest()
//       docReq.setContent(chunk)
//       call.write(docReq);
//     }
//   });
//   readStream.on('end', () => {
//     console.log('Reached end of stream.');
//     call.end();
//   });    

// }