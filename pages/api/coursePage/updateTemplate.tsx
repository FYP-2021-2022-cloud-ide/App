// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success:boolean
  message: string
}
import * as grpc from 'grpc';

import {  SuccessStringReply,UpdateTemplateRequest  } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());
    
    var body = JSON.parse(req.body);console.log(body)
    var docReq = new UpdateTemplateRequest();
    docReq.setTemplateid(body.templateId);
    docReq.setName(body.templateName);
    docReq.setSectionUserId(body.section_user_id);
  //  docReq.setAssignmentConfigId(body.assignment_config_id);
    docReq.setContainerid(body.containerId);
    docReq.setDescription(body.description);
   // docReq.setActive(body.active)
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