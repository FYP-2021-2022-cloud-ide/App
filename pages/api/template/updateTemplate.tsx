// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success:boolean
  message: string
}
import * as grpc from 'grpc';

import {  SuccessStringReply,UpdateTemplateRequest  } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';
import { checkHaveContainer, checkInSectionBySectionUserId, checkRoleBySectionUserId } from '../../../lib/authentication';

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
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());
    
    const {templateId, templateName, section_user_id, containerId, description, isExam, timeLimit,allow_notification} = JSON.parse(req.body);
    // if (section_user_id != undefined && containerId != undefined){
    //    {/* @ts-ignore */}
    //   if(!(await checkInSectionBySectionUserId(req.oidc.user.sub, section_user_id)) || !(await checkHaveContainer(containerId, req.oidc.user.sub))  || !(await checkRoleBySectionUserId(req.oidc.user.sub, section_user_id, "instructor")))
    //   {res.json(unauthorized());return}
    // }else{
    //   res.json(unauthorized())
    //   return
    // }
    var docReq = new UpdateTemplateRequest();
    docReq.setTemplateid(templateId);
    docReq.setName(templateName);
    docReq.setSectionUserId(section_user_id);
  //  docReq.setAssignmentConfigId(body.assignment_config_id);
    docReq.setContainerid(containerId);
    docReq.setDescription(description);
    docReq.setIsExam(isExam)
    docReq.setTimeLimit(timeLimit)
    docReq.setAllowNotification(allow_notification)
    try{
      client.updateTemplate(docReq, function(err, GoLangResponse: SuccessStringReply) {
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