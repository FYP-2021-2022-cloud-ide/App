import { drive_v3, google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next'

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

interface file{
    name: string,
    id: string
}

async function getFilesByParent(drive:drive_v3.Drive, parent:string, mimeType:string): Promise<file[]>{
    return await new Promise((resolve, reject)=>{
        // console.log("'"+parent+"' in parents and "+mimeType)
        drive.files.list({
            q: "'"+parent+"' in parents and "+mimeType,
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        }, (err:any, res:any) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            // console.log(files)
            resolve(files)
        });
    })
}

// async function buildFilesTree(drive, folderName, folderId){
//     return await new Promise(async (resolve, reject)=>{
//         // get children folders of current folder
//         var children = await getFilesByParent(drive, folderId, "mimeType='application/vnd.google-apps.folder'")
//         if (children.length > 0){
//             children =  await Promise.all(
//                 children.map( async (child)=>{
//                     console.log("fetching sub folder: "+child.id)
//                     return(buildFilesTree(drive, child.name, child.id))
//                 })
//             )
//         }
//         const files = await getFilesByParent(drive, folderId, "mimeType!='application/vnd.google-apps.folder'")
//         resolve({
//             id: folderId,
//             name: folderName,
//             children,
//             files
//         })
//     })
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("inside list file")

    const {credentials, token, folderId} = JSON.parse(req.body)
    // console.log(credentials)
    // console.log(token)
    const {client_secret, client_id, redirect_uris} = credentials;
    const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    auth.setCredentials(token);
    const drive = google.drive({version: 'v3', auth});
    // const root =  await buildFilesTree(drive, "root", "root")
    var children = await getFilesByParent(drive, folderId, "mimeType='application/vnd.google-apps.folder'")
    children = children.map( (child)=>{
        return {
            id: child.id,
            name: child.name,
            closed: true,
            children: [],
            files: []
        }
    })
    const files = await getFilesByParent(drive, folderId, "mimeType!='application/vnd.google-apps.folder'")
    // console.log(root)
    res.status(200).json({
        children,
        files
    })
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
