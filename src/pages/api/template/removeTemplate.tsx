// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import { SuccessStringResponse } from "../../../lib/api/api";

import {grpcClient}from '../../../lib/grpcClient'
import {  SuccessStringReply,TemplateIdRequest  } from '../../../proto/dockerGet/dockerGet_pb';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) {

    var client = grpcClient()
    const {templateId, section_user_id} = JSON.parse(req.body);

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
        res.json({
          success: false,
          message: error
        });
        res.status(405).end();
    }
  }