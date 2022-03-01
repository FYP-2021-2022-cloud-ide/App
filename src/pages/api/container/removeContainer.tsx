// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { SuccessStringResponse ,nodeError } from "../../../lib/api/api";
import {  SuccessStringReply,RemoveContainerRequest  } from '../../../proto/dockerGet/dockerGet_pb';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) {
    var client = grpcClient
    var body = JSON.parse(req.body)
    const { sub} = req.query

    var docReq = new RemoveContainerRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setContainerid(body.containerId);
    docReq.setSub(sub as string)
    try{
      client.removeContainer(docReq, function(err, GoLangResponse: SuccessStringReply) {
        res.json({ 
          success:GoLangResponse.getSuccess(),
          error:{
              status: GoLangResponse.getError().getStatus(),
              error: GoLangResponse.getError().getError(),
          } ,
        });
        res.status(200).end();
      })
    }
    catch(error) {
        res.json({
          success:false,
          error:nodeError(error) ,
        });
        res.status(405).end();
    }
  }