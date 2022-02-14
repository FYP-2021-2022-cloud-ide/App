// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//remember to set the ownership after adding new api
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../lib/fetchAppSession';

import { SuccessStringResponse } from "../../lib/api/api";
type Data = {
  success: boolean
  message:string
}



import {grpcClient}from '../../lib/grpcClient'
import { SuccessStringReply   ,UpdateUserDataRequest } from '../../proto/dockerGet/dockerGet_pb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessStringResponse>
  ) 
{
  var client = grpcClient()
    const{sub}=req.query;
    const { darkMode, bio} = JSON.parse(req.body);//console.log(body)

    var docReq = new UpdateUserDataRequest();
    docReq.setSessionKey(fetchAppSession(req));
    docReq.setSub(sub as string);
    docReq.setDarkmode(darkMode);
    docReq.setBio(bio);
    try{
        client.updateUserData(docReq, function(err, GoLangResponse: SuccessStringReply) {
        if(!GoLangResponse.getSuccess()){
            console.log(GoLangResponse.getMessage())
        }
        
        res.json({
            success : GoLangResponse.getSuccess(),
            message: GoLangResponse.getMessage(),
        })
        res.status(200).end();
        })
    }
    catch(error) {
        res.json({
          success: false,
          message: error
        });
        res.status(405).end();
    }
}