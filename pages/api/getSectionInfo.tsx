// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  sectionUserID:string
  courseName:string
}



import * as grpc from 'grpc';

import {    GetSectionInfoReply,  SectionAndSubRequest } from '../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../proto/dockerGet/dockerGet_grpc_pb';

export default  function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    var target= 'api:50051';
    var client = new DockerClient(
        target,
        grpc.credentials.createInsecure());

    var body = JSON.parse(req.body);
    var docReq = new SectionAndSubRequest();
    docReq.setSub(body.sub);
    docReq.setSectionid(body.sectionid);
    try{
        client.getSectionInfo(docReq, function(err, GoLangResponse: GetSectionInfoReply) {
        if(!GoLangResponse.getSuccess()){
            console.log(GoLangResponse.getMessage())
        }
        
        res.json({
            success : GoLangResponse.getSuccess(),
            message: GoLangResponse.getMessage(),
            sectionUserID : GoLangResponse.getSectionuserid(),
            courseName: GoLangResponse.getCoursename(),
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