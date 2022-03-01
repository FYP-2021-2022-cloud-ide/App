// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { TemplateGetStudentWorkspaceResponse } from "../../../lib/api/api";

import {grpcClient}from '../../../lib/grpcClient'
import {    TemplateGetStudentWorkspaceReply,  TemplateIdRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default async  function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplateGetStudentWorkspaceResponse>
  ) 
{
    var client = grpcClient
    const {templateId, section_user_id} = JSON.parse(req.body);
// console.log(templateId, section_user_id)
    var docReq = new TemplateIdRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setTemplateid(templateId);
    docReq.setSectionUserId(section_user_id)
    try{
        client.getTemplateStudentWorkspace(docReq, function(err, GoLangResponse: TemplateGetStudentWorkspaceReply) {
            var success = GoLangResponse.getSuccess();
            var studentWorkspaces = GoLangResponse.getStudentworkspacesList();
            if (success){
                res.json({
                    success : GoLangResponse.getSuccess(),
                    message: GoLangResponse.getMessage(),
                    studentWorkspaces:
                        studentWorkspaces.map((s)=>{
                            return {
                                status:s.getStatus(),
                                workspaceId:s.getWorkspaceid(),
                                student:{
                                    name:s.getStudent().getName(),
                                    sub:s.getStudent().getSub(),
                                    userId:s.getStudent().getUserid(),
                                },
                            }
                        })||[],
                }) 
            }
            else{
                throw new Error("internal server error " +GoLangResponse.getMessage() );
            }
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