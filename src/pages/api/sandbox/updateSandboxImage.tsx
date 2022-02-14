// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { SuccessStringResponse } from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {    SuccessStringReply,  UpdateSandBoxImageRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) 
{
    var client = grpcClient()

    const {sandboxImageId, description, tempContainerId, title, userId} = JSON.parse(req.body);
    var docReq = new UpdateSandBoxImageRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSandboximageid(sandboxImageId);
    docReq.setDescription(description);
    docReq.setTempcontainerid(tempContainerId);
    docReq.setTitle(title);
    docReq.setUserid(userId);
    try{
        client.updateSandboxImage(docReq, function(err, GoLangResponse: SuccessStringReply) {
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