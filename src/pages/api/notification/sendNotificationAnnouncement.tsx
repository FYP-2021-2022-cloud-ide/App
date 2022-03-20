// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { SuccessStringResponse,nodeError } from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {  SendNotificationAnnouncementRequest, SuccessStringReply } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) 
{
    var client = grpcClient
    const {title, body, sender, sectionId, allowReply} = JSON.parse(req.body);
    var docReq = new SendNotificationAnnouncementRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setAllowReply(allowReply)
    docReq.setBody(body)
    docReq.setSender(sender)
    docReq.setTitle(title)
    docReq.setSectionId(sectionId)

    try{
        client.sendNotificationAnnouncement(docReq, function(err, GoLangResponse: SuccessStringReply) {
            console.log(GoLangResponse)
            res.json({
                success : GoLangResponse.getSuccess(),
                error:{
                    status: GoLangResponse.getError()?.getStatus(),
                    error: GoLangResponse.getError()?.getError(),
                }
            })
            res.status(200).end();
            }
        )
    }
    catch(error) {
        res.json({
            success: false,
            error:nodeError(error) ,
          });
        res.status(405).end();
    }
}