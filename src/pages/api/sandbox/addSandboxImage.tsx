// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { SandboxImageAddResponse ,nodeError} from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {    AddSandBoxImageReply,  AddSandBoxImageRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandboxImageAddResponse>
  ) 
{
    var client = grpcClient

    const {description, imageId, title, userId} = JSON.parse(req.body);
    var docReq = new AddSandBoxImageRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setDescription(description);
    docReq.setImageId(imageId);
    docReq.setTitle(title);
    docReq.setUserid(userId);
    try{
        client.addSandboxImage(docReq, function(err, GoLangResponse: AddSandBoxImageReply) {
            res.json({
                success : GoLangResponse.getSuccess(),
                error:{
                    status: GoLangResponse.getError().getStatus(),
                    error: GoLangResponse.getError().getError(),
                },
                sandboxImageId: GoLangResponse.getSandboximageid()
            })
            res.status(200).end();
            }
        )
    }
    catch(error) {
        res.json({
            success: false,
            error: nodeError(error),
          });
        res.status(405).end();
    }
}