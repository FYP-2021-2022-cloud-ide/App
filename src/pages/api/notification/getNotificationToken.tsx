// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

import { NotificationTokenResponse ,nodeError} from "../../../lib/api/api";


import {grpcClient}from '../../../lib/grpcClient'
import {    GetNotificationTokenReply,  SubRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotificationTokenResponse>
  ) 
{
    var client = grpcClient

    var body = JSON.parse(req.body);
    var docReq = new SubRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(body.sub);
    try{
        client.getNotificationToken(docReq, function(err, GoLangResponse: GetNotificationTokenReply) {

            res.json({
                success : GoLangResponse.getSuccess(),
                error:{
                    status: GoLangResponse.getError()?.getStatus(),
                    error: GoLangResponse.getError()?.getError(),
                  } ,
                notification_token: GoLangResponse.getNotificationToken()
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