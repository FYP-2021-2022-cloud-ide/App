import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import type { NextApiRequest, NextApiResponse } from 'next'
import { SuccessStringResponse ,nodeError} from "../../../lib/api/api";
import {  SuccessStringReply,  UploadRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default async function handler(
    req: NextApiRequest, 
    res:NextApiResponse<SuccessStringResponse>) {
    const {sub,  filePath,parentId,fileType} = JSON.parse(req.body)
    var client = grpcClient
    var docReq = new UploadRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub)
    docReq.setFilepath(filePath)
    docReq.setParentid(parentId)
    docReq.setFiletype(fileType)
    try{
        client.googleUploadFiles(docReq,(error ,GoLangResponse: SuccessStringReply)=>{
            res.json({
                success: GoLangResponse.getSuccess(),
                error:{
                    status: GoLangResponse.getError()?.getStatus(),
                    error: GoLangResponse.getError()?.getError(),
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
