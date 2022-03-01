// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { SandboxImageListResponse ,nodeError} from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {    ListSandBoxImageReply,  ListSandBoxImageRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandboxImageListResponse>
  ) 
{
    var client = grpcClient

    const {userId} = req.query! 
    var docReq = new ListSandBoxImageRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setUserid(userId as string)
    try{
        client.listSandboxImage(docReq, function(err, GoLangResponse: ListSandBoxImageReply) {
            res.json({
                success : GoLangResponse.getSuccess(),
                error:{
                    status: GoLangResponse.getError().getStatus(),
                    error: GoLangResponse.getError().getError(),
                } ,
                sandboxImages: GoLangResponse.getSandboximagesList().map((sandbox)=>(
                    {
                        id: sandbox.getId(),
                        title: sandbox.getTitle(),
                        description: sandbox.getDescription(),
                        imageId: sandbox.getImageid(),
                        sandboxesId: sandbox.getSandboxidList()[0],
                    }
                )) ||[],
            })
            res.status(200).end();
            }
        )
    }
    catch(error) {
        res.json({
            success: false,
            error:nodeError(error) ,
          });
        res.status(405).end();
    }
}