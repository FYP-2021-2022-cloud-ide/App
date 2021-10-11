// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string[]
  //cutMes: string[]
}
import * as grpc from 'grpc';

import {  ListReply,  SubRequest } from '../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../proto/dockerGet/dockerGet_grpc_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var target= 'api:50051';
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());

    var body = JSON.parse(req.body);
    var docReq = new SubRequest();
    docReq.setSub(body.sub);
    try{
      client.listCourses(docReq, function(err, GoLangResponse: ListReply) {
        var mes= GoLangResponse.getMessageList();
        //console.log(mes)
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