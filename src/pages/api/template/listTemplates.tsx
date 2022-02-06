// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

type Data = {
  success: boolean
  message:string
  templates: Template [] | null
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


import {grpcClient}from '../../../lib/grpcClient'
import {    ListTemplatesReply,  SectionAndSubRequest } from '../../../proto/dockerGet/dockerGet_pb';


function unauthorized(){
  return({
    success: false,
    message: "unauthorized",
    templates: null
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    // var body = JSON.parse(req.body);
    var docReq = new SectionAndSubRequest();
    const {sub, sectionid} = req.query;
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub as string);
    docReq.setSectionid(sectionid as string);
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
              isExam:t.getIsExam(),
              timeLimit:t.getTimeLimit(),
              allow_notification:t.getAllowNotification(),
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