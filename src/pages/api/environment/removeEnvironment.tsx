// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success:boolean
  message: string
}
import {grpcClient}from '../../../lib/grpcClient'
import {  SuccessStringReply,  EnvironmentIdRequest } from '../../../proto/dockerGet/dockerGet_pb';
import { checkInSectionBySectionUserId, checkRoleBySectionUserId } from '../../../lib/authentication';

function unauthorized(){
  return({
    success: false,
    message: "unauthorized",
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    
    const {envId, section_user_id} = JSON.parse(req.body);//console.log(body)
    // if (section_user_id != undefined){
    //   {/* @ts-ignore */}
    //   if(!(await checkInSectionBySectionUserId(req.oidc.user.sub, section_user_id))|| !(await checkRoleBySectionUserId(req.oidc.user.sub, section_user_id, "instructor")))
    //   {res.json(unauthorized()); return;}
    // }else{
    //   res.json(unauthorized())
    //   return
    // }

    var docReq = new EnvironmentIdRequest();
    docReq.setEnvironmentid(envId);
    try{
      client.removeEnvironment(docReq, function(err, GoLangResponse: SuccessStringReply) {
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