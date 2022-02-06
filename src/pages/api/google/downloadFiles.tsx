// import { google } from 'googleapis';
// import * as fs from 'fs';
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import {  SuccessStringReply,  DownloadRequest } from '../../../proto/dockerGet/dockerGet_pb';
const DOWNLOAD_DIR = "/tmp"

// export default async function handler(req, res) {
//     console.log("inside list file")
//     const {credentials, token, fileId, fileName} = JSON.parse(req.body)
//     // console.log(credentials)
//     // console.log(token)
//     const {client_secret, client_id, redirect_uris} = credentials;
//     const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
//     auth.setCredentials(token);
//     const drive = google.drive({version: 'v3', auth});
//     const parent = DOWNLOAD_DIR+'/'+fileId
//     fs.mkdir(parent,(err)=>{
//         if (err)
//             console.log(err)
//     })
//     var dest = fs.createWriteStream(parent+"/"+fileName);

//     drive.files.get(
//         { fileId, alt: 'media' },
//         { responseType: 'stream' }
//     ).then(res => {
//         res.data
//         .on('end', () => {
//             console.log('Done downloading file.');
//         })  
//         .on('error', err => {
//             console.error('Error downloading file.');
//         }).pipe(dest);
//     });
//     res.json({
//         success: true
//     })
// }
export default async function handler(req, res) {
    const {sub,  fileId, fileName,filePath,fileType} = JSON.parse(req.body)
    var client = grpcClient()
    var docReq = new DownloadRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub)
    docReq.setFileid(fileId)
    docReq.setFilename(fileName)
    docReq.setFilepath(filePath)
    docReq.setFiletype(fileType)
    try{
        client.googleDownloadFiles(docReq,(error ,GolangResponse: SuccessStringReply)=>{
            if(GolangResponse.getSuccess()){
                res.json({
                    success: true,
                    message: "",
                })

            }else{
                res.json({
                    success: false,
                    message: GolangResponse.getMessage(),
                })
               
            }
            // console.log(GolangResponse.getMessage())
            // console.log(GolangResponse.getSuccess())
            res.status(200).end()
        })
    }catch(error) {
        res.status(405).json({
            success: false,
            message: error,
        });
    }

}

