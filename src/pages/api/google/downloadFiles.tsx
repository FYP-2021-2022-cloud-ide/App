
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { SuccessStringResponse ,nodeError} from "../../../lib/api/api";
import {  SuccessStringReply,  DownloadRequest } from '../../../proto/dockerGet/dockerGet_pb';
const DOWNLOAD_DIR = "/tmp"

export default async function handler(
    req: NextApiRequest, 
    res:NextApiResponse<SuccessStringResponse>) {
    const {sub,  fileId, fileName,filePath,fileType} = JSON.parse(req.body)
    var client = grpcClient
    var docReq = new DownloadRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub)
    docReq.setFileid(fileId)
    docReq.setFilename(fileName)
    docReq.setFilepath(filePath)
    docReq.setFiletype(fileType)
    try{
        client.googleDownloadFiles(docReq,(error ,GoLangResponse: SuccessStringReply)=>{

            res.json({
                success: GoLangResponse.getSuccess(),
                error:{
                    status: GoLangResponse.getError().getStatus(),
                    error: GoLangResponse.getError().getError(),
                } ,
            })


            res.status(200).end()
        })
    }catch(error) {
        res.status(405).json({
            success: false,
            error:nodeError(error) ,
        });
    }

}

