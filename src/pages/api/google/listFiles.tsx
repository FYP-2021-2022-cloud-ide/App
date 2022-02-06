import { google } from 'googleapis';
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import {  ChildrenReply,  ListFilesRequest } from '../../../proto/dockerGet/dockerGet_pb';
// const GOOGLE_TYPE = [
//     "application/vnd.google-apps.document", 
//     "application/vnd.google-apps.form", 
//     "application/vnd.google-apps.drawing",
//     "application/vnd.google-apps.fusiontable",
//     "application/vnd.google-apps.map",
//     "application/vnd.google-apps.presentation",
//     "application/vnd.google-apps.script",
//     "application/vnd.google-apps.shortcut",
//     "application/vnd.google-apps.site",
//     "application/vnd.google-apps.spreadsheet"
// ]

// async function getFilesByParent(drive, parent, mimeType){
//     return await new Promise((resolve, reject)=>{
//         // console.log("'"+parent+"' in parents and "+mimeType)
//         var baseQuery = "'"+parent+"' in parents and "+mimeType
//         for (let i=0; i<GOOGLE_TYPE.length; i++){
//             baseQuery = baseQuery + " and mimeType!='"+GOOGLE_TYPE[i]+"'"
//         }
//         drive.files.list({
//             q: baseQuery,
//             pageSize: 10,
//             fields: 'nextPageToken, files(id, name)',
//         }, (err, res) => {
//             if (err) return console.log('The API returned an error: ' + err);
//             const files = res.data.files;
//             // console.log(files)
//             resolve(files)
//         });
//     })
// }

export default async function handler(req, res) {
    console.log("inside list file")
    const {folderId, sub} = JSON.parse(req.body)
    var client = grpcClient()
    var docReq = new ListFilesRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setFolderid(folderId)
    docReq.setSub(sub)
    try{
        client.googleListFile(docReq,(error ,GolangResponse: ChildrenReply)=>{
            if(GolangResponse.getSuccess()){
                res.json({
                    success: true,
                    message: "",
                    folders: GolangResponse.getFoldersList().map(folder=>({
                        id: folder.getId(),
                        name: folder.getName()
                    })),
                    files: GolangResponse.getFilesList().map(file=>({
                        id: file.getId(),
                        name: file.getName()
                    }))
                })
            }else{
                res.json({
                    success: false,
                    message: GolangResponse.getMessage(),
                    folders: [],
                    files: []
                })
            }
            
        })
    }catch(error) {
        res.status(405).json({
            success: false,
            message: error,
            folders: [],
            files: []
        });
    }
    // // console.log(credentials)
    // // console.log(token)
    // const {client_secret, client_id, redirect_uris} = credentials;
    // const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    // auth.setCredentials(token);
    // const drive = google.drive({version: 'v3', auth});
    // // const root =  await buildFilesTree(drive, "root", "root")
    // const children = await getFilesByParent(drive, folderId, "mimeType='application/vnd.google-apps.folder'")
    // const files = await getFilesByParent(drive, folderId, "mimeType!='application/vnd.google-apps.folder'")
    // // console.log(root)
    // res.status(200).json({
    //     children,
    //     files
    // })
    // drive.files.list({
    //     pageSize: 10,
    //     fields: 'nextPageToken, files(id, name)',
    // }, (err, res) => {
    //     if (err) return console.log('The API returned an error: ' + err);
    //     const files = res.data.files;
    //     console.log(files)
    //     Ares.status(200).json({files})
    // });
    // window.location(authUrl)
}
