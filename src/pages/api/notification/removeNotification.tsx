// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

type Data = {
  success: boolean
  message:string
}

import {grpcClient}from '../../../lib/grpcClient'
import {    SuccessStringReply,  RemoveNotificationRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    var client = grpcClient()
    const {userId, notificationId} = JSON.parse(req.body);
    var docReq = new RemoveNotificationRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setUserid(userId);
    docReq.setNotificationid(notificationId);
    try{
        client.removeNotification(docReq, function(err, GoLangResponse: SuccessStringReply) {
            console.log(GoLangResponse)
            res.json({
                success : GoLangResponse.getSuccess(),
                message: GoLangResponse.getMessage(),
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