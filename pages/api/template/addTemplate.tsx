// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success:boolean
  message: string
  templateID:string
}
import * as grpc from 'grpc';

import {  AddTemplateReply,  AddTemplateRequest } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';
import { checkHaveContainer, checkInSectionBySectionUserId, checkRoleBySectionUserId } from '../../../lib/authentication';

function unauthorized(){
  return({
    success: false,
    message: "unauthorized",
    templateID: ""
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
    
    const {templateName, section_user_id, assignment_config_id, containerId, description, active, isExam, timeLimit} = JSON.parse(req.body);
    if (section_user_id != undefined && containerId != undefined){
      if(!(await checkInSectionBySectionUserId(req.oidc.user.sub, section_user_id)) || !(await checkHaveContainer(containerId, req.oidc.user.sub))  || !(await checkRoleBySectionUserId(req.oidc.user.sub, section_user_id, "instructor")))
      {res.json(unauthorized());return}
    }else{
      res.json(unauthorized())
      return
    }
    var docReq = new AddTemplateRequest();
    docReq.setName(templateName);
    docReq.setSectionUserId(section_user_id);
    docReq.setAssignmentConfigId(assignment_config_id);
    docReq.setContainerid(containerId);
    docReq.setDescription(description);
    docReq.setActive(active)
    docReq.setIsExam(isExam)
    docReq.setTimeLimit(timeLimit)
    try{
      client.addTemplate(docReq, function(err, GoLangResponse: AddTemplateReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        //console.log(GoLangResponse.getTemplateid())
        res.json({ 
          success:GoLangResponse.getSuccess(),
          message : GoLangResponse.getMessage(), 
          templateID:GoLangResponse.getTemplateid()
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