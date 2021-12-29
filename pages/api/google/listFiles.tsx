import { drive_v3, google } from 'googleapis';
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
import type { NextApiRequest, NextApiResponse } from 'next'

interface file{
    name: string,
    id: string
}

async function getFilesByParent(drive: drive_v3.Drive, parent:string, mimeType: string) :Promise<file[]>{
    return await new Promise((resolve, reject)=>{
        // console.log("'"+parent+"' in parents and "+mimeType)
        drive.files.list({
            q: "'"+parent+"' in parents and "+mimeType,
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        }, (err: any, res: any) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            // console.log(files)
            resolve(files)
        });
    })
}

async function buildFilesTree(drive: drive_v3.Drive, folderName: string, folderId: string){
    return await new Promise(async (resolve, reject)=>{
        // get children folders of current folder
        var temp = await getFilesByParent(drive, folderId, "mimeType='application/vnd.google-apps.folder'")
        var children: any = []
        if (temp.length > 0){
            children =  await Promise.all(
                temp.map( async (child: file)=>{
                    console.log("fetching sub folder: "+child.id)
                    return(buildFilesTree(drive, child.name, child.id))
                })
            )
        }
        const files = await getFilesByParent(drive, folderId, "mimeType!='application/vnd.google-apps.folder'")
        resolve({
            id: folderId,
            name: folderName,
            children,
            files
        })
    })
}

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    console.log("inside list file")

    const {credentials, token} = JSON.parse(req.body)
    // console.log(credentials)
    // console.log(token)
    const {client_secret, client_id, redirect_uris} = credentials;
    const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    auth.setCredentials(token);
    const drive = google.drive({version: 'v3', auth});
    const root =  await buildFilesTree(drive, "root", "root")
    console.log(root)
    res.status(200).json({files:root})
}
