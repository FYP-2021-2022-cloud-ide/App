// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  userSectionID: string
  message:string
  environments: Environment []
  //cutMes: string[]
}

type Environment = {
  id: string
  imageId: string
  libraries:string
  environmentName: string
  description: string
}

import * as grpc from 'grpc';

import {  ListEnvironmentsReply,  SectionAndSubRequest } from '../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../proto/dockerGet/dockerGet_grpc_pb';

export default  function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
   // console.log("cunw")c
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());

    var body = JSON.parse(req.body);
    var docReq = new SectionAndSubRequest();
    docReq.setSectionid(body.sectionid);
    docReq.setSub(body.sub);

    try{
      client.listEnvironments(docReq, function(err, GoLangResponse: ListEnvironmentsReply) {
        var envs= GoLangResponse.getEnvironmentsList();
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        res.json({
          success : GoLangResponse.getSuccess(),
          userSectionID: GoLangResponse.getUsersectionid(),
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