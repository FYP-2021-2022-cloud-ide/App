// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  templates: Template []
  //cutMes: string[]
}

type Template = {
  id: string
  name: string
  description:string
  imageId: string
  assignment_config_id: string
  active:boolean
  storage:string
}


import * as grpc from 'grpc';

import {    ListTemplatesReply,  SectionAndSubRequest } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';

export default  function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
   // console.log("cunw")
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());

    var body = JSON.parse(req.body);
    var docReq = new SectionAndSubRequest();
    docReq.setSub(body.sub);
    docReq.setSectionid(body.sectionid);
    try{
      client.listTemplates(docReq, function(err, GoLangResponse: ListTemplatesReply) {
        var templates= GoLangResponse.getTemplatesList();
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        
        res.json({
          success : GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          templates:templates.map(t=>{
            // console.log(t.getContaineridList())
            // console.log(t.getActive())
            return ({
              id: t.getId(),
              name:t.getName(),
              description:t.getDescription(),
              imageId: t.getImageid(),
              assignment_config_id: t.getAssignmentConfigId(),
              storage: t.getStorage(),
              active: t.getActive(),
              containerID:t.getContaineridList()[0],
            })
          })
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