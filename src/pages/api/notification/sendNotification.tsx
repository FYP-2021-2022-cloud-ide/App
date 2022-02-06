// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

type Data = {
  success: boolean
  message:string
  notificationId: string
}

import {grpcClient}from '../../../lib/grpcClient'
import {    SendNotificationReply,  SendNotificationRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    var client = grpcClient()
    const {title, body, sender, receiver, allowReply} = JSON.parse(req.body);
    var docReq = new SendNotificationRequest();
    docReq.setSessionKey(fetchAppSession(req));
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