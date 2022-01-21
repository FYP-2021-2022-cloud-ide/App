import { google } from 'googleapis';
import * as fs from 'fs';

const DOWNLOAD_DIR = "/tmp"
const GOOGLE_TYPE = [
    "application/vnd.google-apps.document", 
    "application/vnd.google-apps.form", 
    "application/vnd.google-apps.drawing",
    "application/vnd.google-apps.fusiontable",
    "application/vnd.google-apps.map",
    "application/vnd.google-apps.presentation",
    "application/vnd.google-apps.script",
    "application/vnd.google-apps.shortcut",
    "application/vnd.google-apps.site",
    "application/vnd.google-apps.spreadsheet"
]

async function downloadFile(drive ,fileId, target){
    return await new Promise<void>((resolve, reject)=>{
        var dest = fs.createWriteStream(target);
        let progress = 0;
        drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'stream' }
        ).then(res => {
            res.data
            .on('end', () => {
                console.log('Done downloading file.');
                resolve()
            })  
            .on('error', err => {
                console.error('Error downloading file.');
            })  
            .on('data', d => {
                progress += d.length;
                if (process.stdout.isTTY) {
                    //@ts-ignore
                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);
                    process.stdout.write(`Downloaded ${progress} bytes`);
                }   
            })  
            .pipe(dest);
        });
    })
}

async function getFilesByParent(drive, parent, mimeType){
    return await new Promise((resolve, reject)=>{
        // console.log("'"+parent+"' in parents and "+mimeType)
        var baseQuery = "'"+parent+"' in parents and "+mimeType
        for (let i=0; i<GOOGLE_TYPE.length; i++){
            baseQuery = baseQuery + " and mimeType!='"+GOOGLE_TYPE[i]+"'"
        }
        drive.files.list({
            q: baseQuery,
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            // console.log(files)
            resolve(files)
        });
    })
}

async function downloadFolder(drive ,folderId, folderName, prevPath){
    const currentPath = prevPath + "/" + folderName
    fs.mkdir(currentPath, (err)=>{
        if (err)
            console.log(err)
    })
    
    const files:any = await getFilesByParent(drive, folderId, "mimeType!='application/vnd.google-apps.folder'")
    const children:any = await getFilesByParent(drive, folderId, "mimeType='application/vnd.google-apps.folder'")
    console.log('start promise all')
    console.log('folders: ', children)
    console.log("files: ", files)
    await Promise.all(
        [
            ...files.map(async(file)=>downloadFile(drive, file.id, currentPath + "/" + file.name)),
            ...children.map(async(child)=>(downloadFolder(drive, child.id, child.name, currentPath)))
        ]
    )
}

export default async function handler(req, res) {
    console.log("inside list file")
    const {credentials, token, folderId, folderName} = JSON.parse(req.body)
    // console.log(credentials)
    // console.log(token)
    const {client_secret, client_id, redirect_uris} = credentials;
    const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    auth.setCredentials(token);
    const drive = google.drive({version: 'v3', auth});
    const parent = DOWNLOAD_DIR+"/"+folderId
    fs.mkdir(parent,(err)=>{
        if (err)
            console.log(err)
    })    
    await downloadFolder(drive, folderId, folderName, parent)
    res.json({
        success: true
    })
}
