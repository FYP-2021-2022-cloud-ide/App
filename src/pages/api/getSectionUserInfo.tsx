// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../lib/fetchAppSession';

import { SectionUserInfoResponse,SectionRole ,nodeError } from "../../lib/api/api";



import {grpcClient}from '../../lib/grpcClient'
import {    GetSectionInfoReply,  SectionAndSubRequest } from '../../proto/dockerGet/dockerGet_pb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SectionUserInfoResponse>
  ) 
{
    var client = grpcClient
    const {sectionid, sub} = req.query
  
    var docReq = new SectionAndSubRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub as string);
    docReq.setSectionid(sectionid as string);
    try{
        client.getSectionInfo(docReq, function(err, GoLangResponse: GetSectionInfoReply) {        
        res.json({
            success : GoLangResponse.getSuccess(),
            error:{
                status: GoLangResponse.getError().getStatus(),
                error: GoLangResponse.getError().getError(),
            } ,
            sectionUserID : GoLangResponse.getSectionuserid(),
            courseName: GoLangResponse.getCoursename(),
            role:GoLangResponse.getRole() as SectionRole,
        })
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