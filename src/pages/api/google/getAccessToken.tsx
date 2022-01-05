import { google } from 'googleapis';
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res:NextApiResponse) {
    const {credentials, code} = JSON.parse(req.body)
    const {client_secret, client_id, redirect_uris} = credentials;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    oAuth2Client.getToken(code, (err, token) => {
        res.status(200).json({token})
    });
  // window.location(authUrl)
//   res.status(200).json({ url: authUrl })
}
