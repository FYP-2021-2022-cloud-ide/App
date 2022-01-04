// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  message:string
}

import {grpcClient}from '../../../lib/grpcClient'
import {    SuccessStringReply, UpdateSubscriptionRequest } from '../../../proto/dockerGet/dockerGet_pb';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) 
{
    var client = grpcClient()
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