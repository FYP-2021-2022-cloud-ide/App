import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs/promises';
import { nobody } from '../../../lib/cloudFile';
import path from 'path';
import dirTree, { DirectoryTree } from "directory-tree"



type Data = {
    success: boolean
    message: string
    tree: DirectoryTree
}

export const config = {
    api: {
        bodyParser: false,
    },
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // var client = grpcClient()
    const { userId } = req.query;
    // const {file} = JSON.parse(req.body);
    // var formData :FormData=req.body
    // //console.log(formData)

    const data: any = await new Promise((resolve, reject) => {
        const form = new IncomingForm({ multiples: true });
        form.parse(req, (err, fields, { files }) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

    let tree1: DirectoryTree

    try { 
        tree1 = dirTree("/volumes/" + userId + "/persist")
    } catch (error) {
        res.json(error);
        res.status(405).end();
    }


    const { fields: { filePath }, files } = data
    if (Array.isArray(files)) {
        files.forEach(async (file, index) => {
            var targetPath = `/${filePath.split("/").filter(t => t != "").join("/")}/${file.originalFilename.split("/").filter(t => t != "").join("/")}`
            await ensureDirectoryExistence(targetPath)
            await fs.copyFile(file.filepath, targetPath)
            await fs.chmod(targetPath, 0o777)
            await fs.lchown(targetPath, nobody(), nobody())
        })
    } else {
        var file = files
        console.log(file.filepath)
        var targetPath = `${filePath}/${file.originalFilename}`
        await ensureDirectoryExistence(targetPath)
        await fs.copyFile(file.filepath, targetPath)
        await fs.chmod(targetPath, 0o777)
        await fs.chown(targetPath, nobody(), nobody())
    }
    let tree2: DirectoryTree
    console.log("check tree2 ")

    try {
        tree2 = dirTree("/volumes/" + userId + "/persist")
        // if (JSON.stringify(tree1) == JSON.stringify(tree2))
        //     throw new Error("internal server error. Past tree and current tree is the same")
        console.log("return data")
        res.json({
            success: true,
            tree: tree2,
            message: "upload successful"
        });

        res.status(200).end();
    } catch (error) {
        res.json(error);
        res.status(405).end();
    }
}
async function ensureDirectoryExistence(filePath) {
    try {
        await fs.readdir(path.dirname(filePath))
    } catch (error) {
        console.log(`creating ${path.dirname(filePath)}`)
        await fs.mkdir(path.dirname(filePath), { recursive: true })
    }
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