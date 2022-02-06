// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

type Data = {
  success:boolean
  message: string
}
import {grpcClient}from '../../../lib/grpcClient'
import {  SuccessStringReply,UpdateTemplateRequest  } from '../../../proto/dockerGet/dockerGet_pb';

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
    docReq.setSessionKey(fetchAppSession(req));
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