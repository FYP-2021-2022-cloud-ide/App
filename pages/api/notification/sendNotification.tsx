// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
  notificationId: string
}

import * as grpc from 'grpc';

import {    SendNotificationReply,  SendNotificationRequest } from '../../../proto/dockerGet/dockerGet_pb';
import { DockerClient } from '../../../proto/dockerGet/dockerGet_grpc_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    console.log('inside api')
    var target= 'api:50051';
    var client = new DockerClient(
        target,
        grpc.credentials.createInsecure());

    const {title, body, sender, receiver, allowReply} = JSON.parse(req.body);
    var docReq = new SendNotificationRequest();
    docReq.setTitle(title)
    docReq.setBody(body)
    docReq.setSender(sender)
    docReq.setReceiver(receiver)
    docReq.setAllowReply(allowReply)
    try{
        client.sendNotification(docReq, function(err, GoLangResponse: SendNotificationReply) {
            console.log(GoLangResponse)
            res.json({
                success : GoLangResponse.getSuccess(),
                message: GoLangResponse.getMessage(),
                notificationId: GoLangResponse.getNotificationId(),
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