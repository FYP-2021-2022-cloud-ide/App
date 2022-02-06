import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import {  SuccessStringReply,  UploadRequest } from '../../../proto/dockerGet/dockerGet_pb';

// export default async function handler(req, res) {
//     console.log('inside upload')
//     const {credentials, token, filePath} = JSON.parse(req.body)
//     var fileName = filePath
//     if (filePath !== "" && filePath[0] == "/"){
//         const temp = filePath.slice(1).split("/")
//         fileName =  temp[temp.length-1]
//     }
//     const {client_secret, client_id, redirect_uris} = credentials;
//     const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
//     auth.setCredentials(token);
//     const drive = google.drive({version: 'v3', auth});
//     var fileMetadata = {
//         "name": fileName,
//         "parents": ["root"]
//     };
//     var media = {
//     // mimeType: 'image/jpeg',
//         body: fs.createReadStream(filePath)
//     };
//     drive.files.create({
//         //@ts-ignore
//         resource: fileMetadata,
//         media: media,
//         fields: 'id'
//         }, function (err, file) {
//         if (err) {
//             // Handle error
//             console.error(err);
//         } else {
//             const {data:{id}} = file
//             console.log('File Id: ', id);
//         }
//     });
// }


export default async function handler(req, res) {
    const {sub,  filePath,parentId,fileType} = JSON.parse(req.body)
    var client = grpcClient()
    var docReq = new UploadRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub)
    docReq.setFilepath(filePath)
    docReq.setParentid(parentId)
    docReq.setFiletype(fileType)
    try{
        client.googleUploadFiles(docReq,(error ,GolangResponse: SuccessStringReply)=>{
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
            // console.log(error,GolangResponse)
            res.status(200).end()
        })
    }catch(error) {
        res.status(405).json({
            success: false,
            message: error,
        });
    }
}
