// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import { SandboxAddResponse } from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {    AddSandBoxReply,  AddSandBoxRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandboxAddResponse>
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
        res.json({
            success: false,
            message: error
          });
        res.status(405).end();
    }
}