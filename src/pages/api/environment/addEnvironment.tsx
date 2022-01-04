// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {grpcClient}from '../../../lib/grpcClient'
type Data = {
  success:boolean
  message: string
  environmentID:string
}
import {  AddEnvironmentReply,  AddEnvironmentRequest } from '../../../proto/dockerGet/dockerGet_pb';

import { checkInSectionBySectionUserId, checkRoleBySectionUserId } from '../../../lib/authentication';

function unauthorized(){
  return({
    success: false,
    message: "unauthorized",
    environmentID: ""
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    const {libraries, name, section_user_id, description} = JSON.parse(req.body);
    // if (section_user_id != undefined){
    //   {/* @ts-ignore */}
    //   if(!(await checkInSectionBySectionUserId(req.oidc.user.sub, section_user_id)) || !(await checkRoleBySectionUserId(req.oidc.user.sub, section_user_id, "instructor"))){
    //     res.json(unauthorized()); return;
    //   }
    // }else{
    //   res.json(unauthorized())
    //   return
    // }

    var docReq = new AddEnvironmentRequest();
    docReq.setLibrariesList(libraries);
    docReq.setName(name);
    docReq.setSectionUserId(section_user_id);
    docReq.setDescription(description)
    try{
      client.addEnvironment(docReq, function(err, GoLangResponse: AddEnvironmentReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        res.json({ 
          success:GoLangResponse.getSuccess(),
          message : GoLangResponse.getMessage(), 
          environmentID: GoLangResponse.getEnvironmentid(),
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