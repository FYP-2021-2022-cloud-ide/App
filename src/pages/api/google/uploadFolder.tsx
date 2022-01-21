import { google } from 'googleapis';
import dirTree from 'directory-tree';
import * as fs from 'fs';

// function extractName(filePath){
//     var fileName = filePath
//     if (filePath !== "" && filePath[0] == "/"){
//         const temp = filePath.slice(1).split("/")
//         fileName =  temp[temp.length-1]
//     }
//     return fileName
// }

async function uploadFile(drive ,filePath, fileName ,parent){
    return new Promise((resolve, reject)=>{
        var fileMetadata = {
            "name": fileName,
            "parents": [parent]
        };
        var media = {
        // mimeType: 'image/jpeg',
            body: fs.createReadStream(filePath)
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
            }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
                resolve(err)
            } else {
                const {data:{id}} = file
                console.log('File Id: ', id);
                resolve(id)
            }
            });
    })
    
}

async function createFolder(drive ,folderName, parent){
    return new Promise((resolve, reject)=>{
        var fileMetadata = {
            'name': folderName,
            'mimeType': 'application/vnd.google-apps.folder',
            'parents' : [parent]
        };
        drive.files.create({
            resource: fileMetadata,
            fields: 'id'
        }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
                resolve(err)
            } else {
                const {data:{id}} = file
                console.log('Folder Id: ', id);
                resolve(id)
            }
        });
    })
}

async function uploadFolder(drive ,dirTree, parent){
    if (dirTree.type !== 'directory'){
        await uploadFile(drive, dirTree.path, dirTree.name ,parent)
    }else{
        // create folder
        const currentParent = await createFolder(drive ,dirTree.name, parent)
        // extract sub folders and files
        const children = dirTree.children.filter(child => child.type == "directory")
        const files = dirTree.children.filter(child => child.type == "file")
        await Promise.all(
            [
                ...files.map(file=>(uploadFile(drive ,file.path, file.name ,currentParent))),
                ...children.map(child=>(uploadFolder(drive ,child, currentParent)))
            ]
        )
    }
}

export default async function handler(req, res) {
    console.log('inside upload')
    const {credentials, token, filePath, parent} = JSON.parse(req.body)
    const {client_secret, client_id, redirect_uris} = credentials;
    const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    auth.setCredentials(token);
    const drive = google.drive({version: 'v3', auth});
    const tree = dirTree(filePath, { exclude: /__MACOSX|.DS_Store/})
    await uploadFolder(drive, tree, parent)
    // console.log(dirTree(filePath,{ exclude: /__MACOSX|.DS_Store/}))
    console.log('success')
    res.json({success:true})
}
