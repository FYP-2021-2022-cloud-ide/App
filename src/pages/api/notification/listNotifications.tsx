// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession'

type Data = {
  success: boolean
  message:string
  notifications: Notification [] |null
}

type Notification={
    id:string
    title:string
    body:string
    sender:Sender
    allow_reply:boolean
    updatedAt:string
}

type Sender={
    id:string
    sub:string
    name:string
}
import {grpcClient}from '../../../lib/grpcClient'
import {    ListNotificationsReply,  UserIdRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    var client = grpcClient()
    const {userId} = req.query! 
    var docReq = new UserIdRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setUserid(userId as string);
    try{
        client.listNotifications(docReq, function(err, GoLangResponse: ListNotificationsReply) {
            // console.log(GoLangResponse)
            if(!GoLangResponse.getSuccess()){
                console.log(GoLangResponse.getMessage())
            }
            var nts= GoLangResponse.getNotificationsList()
            res.json({
                success : GoLangResponse.getSuccess(),
                message: GoLangResponse.getMessage(),
                notifications:nts.map(nt=>{
                    var sender=nt.getSender()
                    return ({
                        id:nt.getId(),
                        title:nt.getTitle(),
                        body:nt.getBody(),
                        sender:{
                            id:sender!.getId(),
                            sub:sender!.getSub(),
                            name:sender!.getName(),
                        },
                        allow_reply:nt.getAllowReply(),
                        updatedAt:nt.getUpdatedAt(),
                    })
                }),
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