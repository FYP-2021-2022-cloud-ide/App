// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
}

import * as grpc from 'grpc';

import {    SuccessStringReply, UpdateSubscriptionRequest } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    console.log('inside update api')
    var target= 'api:50051';
    var client = new DockerClient(
        target,
        grpc.credentials.createInsecure());

    var body = JSON.parse(req.body);
    console.log(body)
    var docReq = new UpdateSubscriptionRequest();
    docReq.setSemesterid(body.semesterId)
    docReq.setToken(body.registrationToken)
    docReq.setUserid(body.userId)
    try{
        client.updateSubscription(docReq, function(err, GoLangResponse: SuccessStringReply) {
            console.log(GoLangResponse)
            if(!GoLangResponse.getSuccess()){
                console.log(GoLangResponse.getMessage())
            }
            res.json({
                success : GoLangResponse.getSuccess(),
                message: GoLangResponse.getMessage()
            })
            res.status(200).end();
            }
        )
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
}