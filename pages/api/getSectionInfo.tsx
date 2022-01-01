// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  sectionUserID:string
  courseName:string
  role:string
}



import * as grpc from 'grpc';

import {    GetSectionInfoReply,  SectionAndSubRequest } from '../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../proto/dockerGet/dockerGet_grpc_pb';
import { checkInSectionBySectionId } from '../../lib/authentication';

  
function unauthorized(){
  return({
      success: false,
      message: "unauthorized",
      sectionUserID: "",
      courseName: "",
      role: ""
  })
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    var target= 'api:50051';
    var client = new DockerClient(
        target,
        grpc.credentials.createInsecure());
    const {sectionid, sub} = req.query
     {/* @ts-ignore */}
    // if(sub == req.oidc.user.sub){
    //    {/* @ts-ignore */}
    //   if(!(await checkInSectionBySectionId(req.oidc.user.sub, sectionid as string) ) )
    //   {res.json(unauthorized());return}
    // }else{
    //   res.json(unauthorized())
    //   return;
    // }
    var docReq = new SectionAndSubRequest();
    docReq.setSub(sub as string);
    docReq.setSectionid(sectionid as string);
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
            role:GoLangResponse.getRole(),
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