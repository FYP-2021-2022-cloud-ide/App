// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';

type Data = {
  success:boolean
  message: string
}
import {grpcClient}from '../../../lib/grpcClient'
import {  SuccessStringReply,  EnvironmentIdRequest } from '../../../proto/dockerGet/dockerGet_pb';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    var client = grpcClient()
    
    const {envId, section_user_id} = JSON.parse(req.body);//console.log(body)

    var docReq = new EnvironmentIdRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setEnvironmentid(envId);
    docReq.setSectionUserId(section_user_id);
    try{
      client.removeEnvironment(docReq, function(err, GoLangResponse: SuccessStringReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
        }
        res.json({ 
          success:GoLangResponse.getSuccess(),
          message : GoLangResponse.getMessage(), 
        });
        res.status(200).end();
      })
    }
    catch(error) {
        //@ts-ignore
        res.json(error);
        res.status(405).end();
    }
  }