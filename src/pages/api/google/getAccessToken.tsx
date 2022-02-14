import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { SuccessStringResponse } from "../../../lib/api/api";
import {  SuccessStringReply,  CodeRequest } from '../../../proto/dockerGet/dockerGet_pb';
export default function handler(
    req: NextApiRequest, 
    res:NextApiResponse<SuccessStringResponse>) {

    const {code, sub} = JSON.parse(req.body)
    var client = grpcClient()
    var docReq = new CodeRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setCode(code)
    docReq.setSub(sub)
    try{
        client.requestAccessToken(docReq,(error ,GolangResponse: SuccessStringReply)=>{
            res.json({
                success: GolangResponse.getSuccess(),
                message: GolangResponse.getMessage()
            })
        })
    }catch(error) {
        res.status(405).json({
          success: false,
          message: error as string
        });
    }
}
