// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { SuccessStringResponse } from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {  SuccessStringReply,UpdateTemplateRequest  } from '../../../proto/dockerGet/dockerGet_pb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) {
    var client = grpcClient()
    const {templateId, templateName, section_user_id, containerId, description, isExam, timeLimit,allow_notification} = JSON.parse(req.body);

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
        res.json({
          success: false,
          message: error
        });
        res.status(405).end();
    }
  }