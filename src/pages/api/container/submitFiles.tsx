// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { SuccessStringResponse } from "../../../lib/api/api";
import {  SuccessStringReply,SubmitFilesRequest  } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) {
    var client = grpcClient()
    
    var body = JSON.parse(req.body);console.log(body)
    var docReq = new SubmitFilesRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setContainerid(body.containerId);
    try{
      client.submitFiles(docReq, function(err, GoLangResponse: SuccessStringReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        res.json({ 
          success:GoLangResponse.getSuccess(),
          message : GoLangResponse.getMessage(), 
        });
        res.status(200).end();
      })
    }
    catch(error) {
        res.json({
          success:false,
          message:error
        });
        res.status(405).end();
    }
  }