// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

type Data = {
  success: boolean
  message:string
  sandboxImageId: string
}

import {grpcClient}from '../../../lib/grpcClient'
import {    AddSandBoxImageReply,  AddSandBoxImageRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    var client = grpcClient()

    const {description, tempContainerId, title, userId} = JSON.parse(req.body);
    var docReq = new AddSandBoxImageRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setDescription(description);
    docReq.setTempcontainerid(tempContainerId);
    docReq.setTitle(title);
    docReq.setUserid(userId);
    try{
        client.addSandboxImage(docReq, function(err, GoLangResponse: AddSandBoxImageReply) {
            console.log(GoLangResponse)
            if(!GoLangResponse.getSuccess()){
                console.log(GoLangResponse.getMessage())
            }
            res.json({
                success : GoLangResponse.getSuccess(),
                message: GoLangResponse.getMessage(),
                sandboxImageId: GoLangResponse.getSandboximageid()
            })
            res.status(200).end();
            }
        )
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
}