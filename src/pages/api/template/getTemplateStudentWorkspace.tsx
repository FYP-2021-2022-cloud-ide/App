// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { TemplateGetStudentWorkspaceResponse ,nodeError} from "../../../lib/api/api";

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
            var studentWorkspaces = GoLangResponse.getStudentworkspacesList();
            res.json({
                success : GoLangResponse.getSuccess(),
                error:{
                    status: GoLangResponse.getError().getStatus(),
                    error: GoLangResponse.getError().getError(),
                } ,
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
        
            res.status(200).end();
            }
        )
    }
    catch(error) {
        res.json({
            success: false,
            error:nodeError(error) ,
          });
        res.status(405).end();
    }
}