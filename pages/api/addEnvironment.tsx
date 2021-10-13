// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  //cutMes: string[]
}
import * as grpc from 'grpc';

import {  StringReply,  AddEnvironmentRequest } from '../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../proto/dockerGet/dockerGet_grpc_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());
    
    var body = JSON.parse(req.body);console.log(body)
    var docReq = new AddEnvironmentRequest();
    docReq.setLibrariesList(body.libraries);
    docReq.setName(body.name);
    docReq.setSectionUserId(body.section_user_id);
    try{
      client.addEnvironment(docReq, function(err, GoLangResponse: StringReply) {
        var mes= GoLangResponse.getMessage();
        console.log(mes)
        res.json({ message : mes });
        res.status(200).end();
      })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }