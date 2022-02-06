// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

type Data = {
  success:boolean
  message: string
}
import {grpcClient}from '../../../lib/grpcClient'
import {  SuccessStringReply,TemplateIdRequest  } from '../../../proto/dockerGet/dockerGet_pb';


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
    const {templateId, section_user_id} = JSON.parse(req.body);
    // if (section_user_id != undefined){
    //    {/* @ts-ignore */}
    //   if(!(await checkInSectionBySectionUserId(req.oidc.user.sub, section_user_id))|| !(await checkRoleBySectionUserId(req.oidc.user.sub, section_user_id, "instructor")))
    //   {res.json(unauthorized());return}
    //   }else{
    //       res.json(unauthorized())
    //       return
    //   }
    var docReq = new TemplateIdRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setTemplateid(templateId);
    docReq.setSectionUserId(section_user_id)
    try{
      client.removeTemplate(docReq, function(err, GoLangResponse: SuccessStringReply) {
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