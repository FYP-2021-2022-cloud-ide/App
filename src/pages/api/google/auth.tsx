// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next'
import {grpcClient}from '../../../lib/grpcClient'
// type Data = {
//   success:boolean
//   message: string
//   environmentID:string
// }
import {  SuccessStringReply,  EmptyRequest } from '../../../proto/dockerGet/dockerGet_pb';
// const SCOPES = ['https://www.googleapis.com/auth/drive'];

export default function handler(req: NextApiRequest, res:NextApiResponse) {
  // console.log('inisde auth')
  // const {credentials} = JSON.parse(req.body)
  // const {client_secret, client_id, redirect_uris} = credentials;
  // const oAuth2Client = new google.auth.OAuth2(
  //     client_id, client_secret, redirect_uris[0]);
  // const authUrl = oAuth2Client.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: SCOPES,
  // });
  // // window.location(authUrl)
  // res.status(200).json({ url: authUrl })
  console.log('inside auth')
  var docReq = new EmptyRequest();
  var client = grpcClient()
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
