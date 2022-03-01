import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { SuccessStringResponse,nodeError } from "../../../lib/api/api";
import {  SuccessStringReply,  CodeRequest } from '../../../proto/dockerGet/dockerGet_pb';
export default function handler(
    req: NextApiRequest, 
    res:NextApiResponse<SuccessStringResponse>) {

    const {code, sub} = JSON.parse(req.body)
    var client = grpcClient
    var docReq = new CodeRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setCode(code)
    docReq.setSub(sub)
    try{
        client.requestAccessToken(docReq,(error ,GoLangResponse: SuccessStringReply)=>{
            res.json({
                success: GoLangResponse.getSuccess(),
                error:{
                    status: GoLangResponse.getError().getStatus(),
                    error: GoLangResponse.getError().getError(),
                } ,
            })
        })
    }catch(error) {
        res.status(405).json({
          success: false,
          error:nodeError(error) ,
        });
    }
}
