
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { GoogleDriveListResponse } from "../../../lib/api/api";
import {  ChildrenReply,  ListFilesRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default async function handler(
    req: NextApiRequest, 
    res:NextApiResponse<GoogleDriveListResponse>) {
    console.log("inside list file")
    const {folderId, sub} = JSON.parse(req.body)
    var client = grpcClient()
    var docReq = new ListFilesRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setFolderid(folderId)
    docReq.setSub(sub)
    try{
        client.googleListFile(docReq,(error ,GolangResponse: ChildrenReply)=>{
            res.json({
                success: GolangResponse.getSuccess(),
                message: GolangResponse.getMessage(),
                loadedFiles:{
                    folders: GolangResponse.getFoldersList().map(folder=>({
                        id: folder.getId(),
                        name: folder.getName()
                    }))||[],
                    files: GolangResponse.getFilesList().map(file=>({
                        id: file.getId(),
                        name: file.getName()
                    }))||[],
                }
                
            })         
            
            res.status(200).end()
        })
    }catch(error) {
        res.status(405).json({
            success: false,
            message: error,
        });
    }

}
