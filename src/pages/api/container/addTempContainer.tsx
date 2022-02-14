// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { ContainerAddResponse } from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {    AddTempContainerReply,  AddTempContainerRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContainerAddResponse>
  ) 
{
    var client = grpcClient()

    const { sub} = req.query
    const {memLimit, numCPU, imageName, accessRight} = JSON.parse(req.body);
    var docReq = new AddTempContainerRequest();
    docReq.setSessionkey(fetchAppSession(req));
    docReq.setAccessright(accessRight)
    docReq.setMemlimit(memLimit);
    docReq.setNumcpu(numCPU);
    docReq.setImagename(imageName);
    docReq.setSub(sub as string)
    try{
        client.addTempContainer(docReq, function(err, GoLangResponse: AddTempContainerReply) {
            console.log(GoLangResponse)
            if(!GoLangResponse.getSuccess()){
                console.log(GoLangResponse.getMessage())
            }
            res.json({
                success : GoLangResponse.getSuccess(),
                message: GoLangResponse.getMessage(),
                containerID: GoLangResponse.getTempcontainerid()
            })
            res.status(200).end();
            }
        )
    }
    catch(error) {
        res.json({
            success:false,
            message:error
          });
        res.status(405).end();
    }
}