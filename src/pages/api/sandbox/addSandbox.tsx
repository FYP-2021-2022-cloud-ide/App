// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

type Data = {
  success: boolean
  message:string
  sandboxId: string
}

import {grpcClient}from '../../../lib/grpcClient'
import {    AddSandBoxReply,  AddSandBoxRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    var client = grpcClient()

    const {memLimit, numCPU, sandboxImageId} = JSON.parse(req.body);
    var docReq = new AddSandBoxRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setMemlimit(memLimit);
    docReq.setNumcpu(numCPU);
    docReq.setSandboximageid(sandboxImageId);
    try{
        client.addSandbox(docReq, function(err, GoLangResponse: AddSandBoxReply) {
            console.log(GoLangResponse)
            if(!GoLangResponse.getSuccess()){
                console.log(GoLangResponse.getMessage())
            }
            res.json({
                success : GoLangResponse.getSuccess(),
                message: GoLangResponse.getMessage(),
                sandboxId: GoLangResponse.getSandboxid()
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