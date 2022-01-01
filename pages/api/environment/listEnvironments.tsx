// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  environments: Environment [] | null
}

type Environment = {
  id: string
  imageId: string
  libraries:string
  environmentName: string
  description: string
}

import * as grpc from 'grpc';

import {  ListEnvironmentsReply,  SectionAndSubRequest } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';
import { checkInSectionBySectionId, checkRoleBySectionId } from '../../../lib/authentication';

function unauthorized(){
  return({
    success: false,
    message: "unauthorized",
    environments: null
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
   // console.log("cunw")c
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());

    // var body = JSON.parse(req.body);
    const{sectionid, sub} = req.query
    // if (sectionid != undefined){
    //   {/* @ts-ignore */}
    //   if(!(await checkInSectionBySectionId(req.oidc.user.sub, sectionid)) || !(await checkRoleBySectionId(req.oidc.user.sub, sectionid, "instructor")))
    //   {res.json(unauthorized());return;}
    // }else{
    //   res.json(unauthorized())
    //   return
    // }
    var docReq = new SectionAndSubRequest();
    docReq.setSectionid(sectionid as string);
    docReq.setSub(sub as string);

    try{
      client.listEnvironments(docReq, function(err, GoLangResponse: ListEnvironmentsReply) {
        var envs= GoLangResponse.getEnvironmentsList();
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        res.json({
          success : GoLangResponse.getSuccess(),
          message: GoLangResponse.getMessage(),
          environments:envs.map(env=>{
            return ({
              id: env.getId(),
              imageId: env.getImageid(),
              environmentName: env.getEnvironmentname(),
              libraries: env.getLibraries(),
              description: env.getDescription(),
            })
          })
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