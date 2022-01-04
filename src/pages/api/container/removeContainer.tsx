// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {grpcClient}from '../../../lib/grpcClient'
type Data = {
  success:boolean
  message: string
}
import {  SuccessStringReply,RemoveContainerRequest  } from '../../../proto/dockerGet/dockerGet_pb';

import { checkHaveContainer } from '../../../lib/authentication';

function unauthorized(){
  return({
    success: false,
    message: "unauthorized"
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    var body = JSON.parse(req.body);console.log(body)
    // check empty containerId --> user have that container?
    {/* @ts-ignore */}
    // if (!(await checkHaveContainer(body.containerId, req.oidc.user.sub)) ){
    //   res.json(unauthorized())
    //   return
    // }

    var docReq = new RemoveContainerRequest();
    docReq.setContainerid(body.containerId);
    // docReq.setSub(body.sub)
    try{
      client.removeContainer(docReq, function(err, GoLangResponse: SuccessStringReply) {
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
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }