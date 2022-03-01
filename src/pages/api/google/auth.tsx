// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAppSession } from '../../../lib/fetchAppSession';
import {grpcClient}from '../../../lib/grpcClient'

import { SuccessStringResponse } from "../../../lib/api/api";
import {  SuccessStringReply,  EmptyRequest } from '../../../proto/dockerGet/dockerGet_pb';


export default function handler(
  req: NextApiRequest, 
  res:NextApiResponse<SuccessStringResponse>) {

  console.log('inside auth')
  var docReq = new EmptyRequest();
  docReq.setSessionKey(fetchAppSession(req));
  var client = grpcClient
  try{
    client.googleOAuth(docReq, function(err, GoLangResponse: SuccessStringReply) {
      console.log(err)
      res.json({
        success: GoLangResponse.getSuccess(),
        message: GoLangResponse.getMessage()
      })
    })
  }
  catch(error) {
      res.status(405).json({
        success: false,
        message: error
      });
  }
}
