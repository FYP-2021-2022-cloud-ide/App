// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { SuccessStringResponse } from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {    SuccessStringReply,  SandBoxImageIdRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) 
{
    var client = grpcClient()

    const {sandboxImageId, userId} = JSON.parse(req.body);
    var docReq = new SandBoxImageIdRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSandboximageid(sandboxImageId);
    docReq.setUserId(userId);
    try{
        client.removeSandboxImage(docReq, function(err, GoLangResponse: SuccessStringReply) {
            console.log(GoLangResponse)
            if(!GoLangResponse.getSuccess()){
                console.log(GoLangResponse.getMessage())
            }
            res.json({
                success : GoLangResponse.getSuccess(),
                message: GoLangResponse.getMessage(),
            })
            res.status(200).end();
            }
        )
    }
    catch(error) {
        res.json({
            success: false,
            message: error
          });
        res.status(405).end();
    }
}