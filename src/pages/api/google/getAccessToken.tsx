import type { NextApiRequest, NextApiResponse } from 'next'
import {grpcClient}from '../../../lib/grpcClient'

import {  SuccessStringReply,  CodeRequest } from '../../../proto/dockerGet/dockerGet_pb';
export default function handler(req: NextApiRequest, res:NextApiResponse) {
    // const {credentials, code} = JSON.parse(req.body)
    // const {client_secret, client_id, redirect_uris} = credentials;
    // const oAuth2Client = new google.auth.OAuth2(
    //     client_id, client_secret, redirect_uris[0]);

    // oAuth2Client.getToken(code, (err, token) => {
    //     res.status(200).json({token})
    // });
  // window.location(authUrl)
//   res.status(200).json({ url: authUrl })
    const {code, sub} = JSON.parse(req.body)
    var client = grpcClient()
    var docReq = new CodeRequest();
    docReq.setCode(code)
    docReq.setSub(sub)
    try{
        client.requestAccessToken(docReq,(error ,GolangResponse: SuccessStringReply)=>{
            res.json({
                success: GolangResponse.getSuccess(),
                message: GolangResponse.getMessage()
            })
        })
    }catch(error) {
        res.status(405).json({
          success: false,
          message: error
        });
    }
}
