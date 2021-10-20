// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  sectionInfo:string[]
  templates: Template []
  //cutMes: string[]
}

type Template = {
  id: string
  name: string
  imageId: string
  assignment_config_id: string
  storage:string
}


import * as grpc from 'grpc';

import {    ListTemplatesReply,  SectionRequest } from '../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../proto/dockerGet/dockerGet_grpc_pb';

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
    var docReq = new SectionRequest();
    docReq.setSectionid(body.sectionid);
    try{
      client.listTemplates(docReq, function(err, GoLangResponse: ListTemplatesReply) {
        var templates= GoLangResponse.getTemplatesList();
        //console.log(templates)
        res.json({
          success : GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          sectionInfo:GoLangResponse.getSectioninfoList(),
          templates:templates.map(t=>{
            return ({
              id: t.getId(),
              name:t.getName(),
              imageId: t.getImageid(),
              assignment_config_id: t.getAssignmentConfigId(),
              storage: t.getStorage(),
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