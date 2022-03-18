// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { GoogleOAuthReponse ,nodeError} from "../../../lib/api/api";
import {  GoogleOAuthReply,  EmptyRequest } from '../../../proto/dockerGet/dockerGet_pb';


export default function handler(
  req: NextApiRequest, 
  res:NextApiResponse<GoogleOAuthReponse>) {
  var docReq = new EmptyRequest();
  docReq.setSessionKey(fetchAppSession(req));
  var client = grpcClient
  try{
    client.googleOAuth(docReq, function(err, GoLangResponse: GoogleOAuthReply) {
      console.log(err)
      res.json({
        success: GoLangResponse.getSuccess(),
        error:{
          status: GoLangResponse.getError()?.getStatus(),
          error: GoLangResponse.getError()?.getError(),
        } ,
        authURL:GoLangResponse.getAuthurl(),
      })
    })
  }
  catch(error) {
      res.status(405).json({
        success: false,
        error:nodeError(error) ,
      });
  }
}
