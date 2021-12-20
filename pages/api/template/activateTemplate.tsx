// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
}

import * as grpc from 'grpc';

import {    SuccessStringReply,  TemplateIdRequest } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';
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
  ) 
{
    // console.log("cunw")
    var target= 'api:50051';
    var client = new DockerClient(
        target,
        grpc.credentials.createInsecure());

    const {templateId, section_user_id} = JSON.parse(req.body);
    if (section_user_id != undefined){
        if(!(await checkInSectionBySectionUserId(req.oidc.user.sub, section_user_id)) || !(await checkRoleBySectionUserId(req.oidc.user.sub, section_user_id, "instructor")))
        {res.json(unauthorized()); return;}
      }else{
        res.json(unauthorized())
        return
      }
    var docReq = new TemplateIdRequest();
    docReq.setTemplateid(templateId);
    try{
        client.activateTemplate(docReq, function(err, GoLangResponse: SuccessStringReply) {
        if(!GoLangResponse.getSuccess()){
            console.log(GoLangResponse.getMessage())
        }
        res.json({
            success : GoLangResponse.getSuccess(),
            message: GoLangResponse.getMessage(),
        })
        res.status(200).end();
        })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
}