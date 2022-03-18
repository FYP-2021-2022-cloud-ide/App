// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import { TemplateAddResponse ,nodeError} from "../../../lib/api/api";

import {grpcClient}from '../../../lib/grpcClient'
import {  AddTemplateReply,  AddTemplateRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplateAddResponse>
  ) {
    var client = grpcClient
    const {templateName, section_user_id, assignment_config_id,environment_id, containerId, description, active, isExam, timeLimit,allow_notification} = JSON.parse(req.body);

    var docReq = new AddTemplateRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setName(templateName);
    docReq.setSectionUserId(section_user_id);
    docReq.setEnvironmentId(environment_id);
    docReq.setAssignmentConfigId(assignment_config_id);
    docReq.setContainerid(containerId);
    docReq.setDescription(description);
    docReq.setActive(active)
    docReq.setIsExam(isExam)
    docReq.setTimeLimit(timeLimit)
    docReq.setAllowNotification(allow_notification)
    try{
      client.addTemplate(docReq, function(err, GoLangResponse: AddTemplateReply) {
        res.json({ 
          success:GoLangResponse.getSuccess(),
          error:{
            status: GoLangResponse.getError()?.getStatus(),
            error: GoLangResponse.getError()?.getError(),
          } ,
          templateID:GoLangResponse.getTemplateid()
        });
        res.status(200).end();
      })
    }
    catch(error) {
        res.json({
          success: false,
          error:nodeError(error) ,
        });
        res.status(405).end();
    }
  }