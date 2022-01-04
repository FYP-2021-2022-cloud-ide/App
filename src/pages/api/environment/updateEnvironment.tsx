// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success:boolean
  message: string
}
import {grpcClient}from '../../../lib/grpcClient'
import {  SuccessStringReply,UpdateEnvironmentRequest  } from '../../../proto/dockerGet/dockerGet_pb';
import { checkHaveContainer, checkInSectionBySectionUserId } from '../../../lib/authentication';

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
    const{envId, name, section_user_id, containerId, description} = JSON.parse(req.body);
    // if (section_user_id != undefined && containerId != undefined){
    //   {/* @ts-ignore */}
    //   if(!(await checkInSectionBySectionUserId(req.oidc.user.sub, section_user_id)) || !(await checkHaveContainer(containerId, req.oidc.user.sub)) )
    //   {res.json(unauthorized()); return;}
    // }else{
    //   res.json(unauthorized())
    // }

    var docReq = new UpdateEnvironmentRequest();
    docReq.setEnvironmentid(envId);
    docReq.setName(name);
    docReq.setSectionUserId(section_user_id);
    docReq.setContainerid(containerId);
    docReq.setDescription(description)
    try{
      client.updateEnvironment(docReq, function(err, GoLangResponse: SuccessStringReply) {
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